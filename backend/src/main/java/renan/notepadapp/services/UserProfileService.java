package renan.notepadapp.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import renan.notepadapp.dtos.UserDTO;
import renan.notepadapp.dtos.UserProfileUpdateDTO;
import renan.notepadapp.dtos.UserProfileUpdatePasswordDTO;
import renan.notepadapp.entities.User;
import renan.notepadapp.repositories.UserRepository;
import renan.notepadapp.services.exceptions.ResourceBadRequest;
import renan.notepadapp.services.exceptions.ResourceNotFoundException;
import renan.notepadapp.services.exceptions.UnauthorizedException;

@Service
public class UserProfileService {
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AuthService authService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	

	@Transactional(readOnly = true)
	public UserDTO profile() {
		User user = authService.authenticated();
		Optional<User> obj = userRepository.findById(user.getId());
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new UserDTO(entity);
	}
	
	@Transactional
	public UserDTO updateProfile(UserProfileUpdateDTO dto) {
		try {
			User user = authService.authenticated();
			
			if (user == null) {
				throw new UnauthorizedException("Acesso negado");
			}
			
			User entity = userRepository.getOne(user.getId());
			
			User userData = userRepository.findByEmail(dto.getEmail());
			
			if(!dto.getEmail().equals(entity.getEmail()) && userData != null) {
				throw new ResourceBadRequest("Email já possui cadastro");
			}
			
			if (!passwordEncoder.matches(dto.getPassword(), entity.getPassword())) {
				throw new UnauthorizedException("Senha incorreta");
			}
			
			entity.setName(dto.getName());
			entity.setEmail(dto.getEmail());
			entity = userRepository.save(entity);
			return new UserDTO(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found");
		}		
	}
	
	@Transactional
	public void updatePassword(UserProfileUpdatePasswordDTO dto) {
		try {
			User user = authService.authenticated();
			
			User entity = userRepository.getOne(user.getId());
			
			if (!passwordEncoder.matches(dto.getPassword(), entity.getPassword())) {
				throw new UnauthorizedException("Senha incorreta");
			}
			
			entity.setPassword(passwordEncoder.encode(dto.getNewPassword()));
			entity = userRepository.save(entity);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found");
		}		
	}
}
