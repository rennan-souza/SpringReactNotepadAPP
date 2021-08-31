package renan.notepadapp.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import renan.notepadapp.dtos.UserDTO;
import renan.notepadapp.dtos.UserInsertDTO;
import renan.notepadapp.dtos.UserResetPasswordDTO;
import renan.notepadapp.entities.PasswordRecoveryToken;
import renan.notepadapp.entities.Role;
import renan.notepadapp.entities.User;
import renan.notepadapp.repositories.PasswordRecoveryTokenRepository;
import renan.notepadapp.repositories.RoleRepository;
import renan.notepadapp.repositories.UserRepository;
import renan.notepadapp.services.exceptions.ResourceBadRequest;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private RandomHashGeneratorService randomHashGenerator;
	
	@Autowired
	private PasswordRecoveryTokenRepository passwordRecoveryTokenRepository;
	
	@Autowired
	private EmailService emailService;
	
	@Transactional
	public UserDTO signup(UserInsertDTO dto) {
		
		User entity = new User();
		
		entity.setName(dto.getName());
		entity.setEmail(dto.getEmail());
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity = userRepository.save(entity);
		
		Role role = roleRepository.getOne(1L);
		entity.getRoles().add(role);
		
		return new UserDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {	
		Page<User> list = userRepository.findAll(pageable);
		return list.map(x -> new UserDTO(x));
	}
	
	@Transactional
	public void recover(String email) {
		
		User user = userRepository.findByEmail(email);
		
		if (user == null) {
			throw new ResourceBadRequest("Email não cadastrado");
		}
		
		String token = randomHashGenerator.newHash(60);
		
		PasswordRecoveryToken entity = new PasswordRecoveryToken();
		entity.setToken(token);
		entity.setUserId(user.getId());
		passwordRecoveryTokenRepository.save(entity);
		
		emailService.sendEmailRecoverPassword(user.getName(), user.getEmail(), token);
	} 
	
	@Transactional
	public void reset(UserResetPasswordDTO dto) {
		PasswordRecoveryToken passwordRecoveryToken = 
				passwordRecoveryTokenRepository.findByToken(dto.getToken());
		
		if (passwordRecoveryToken == null) {
			throw new ResourceBadRequest("Token não encontrado");
		}
		
		if (passwordRecoveryToken.getExpiresAt().isBefore(Instant.now())) {
			throw new ResourceBadRequest("Token expirado");
		}
		
		User entity = userRepository.getOne(passwordRecoveryToken.getUserId());
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity = userRepository.save(entity);
		
		passwordRecoveryTokenRepository.deleteByToken(dto.getToken());
	}

	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);
		if(user == null) {
			throw new UsernameNotFoundException("Email not found");
		}
		return user;
	}

}
