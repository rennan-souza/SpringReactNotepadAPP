package renan.notepadapp.services;

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
import renan.notepadapp.entities.Role;
import renan.notepadapp.entities.User;
import renan.notepadapp.repositories.RoleRepository;
import renan.notepadapp.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private RoleRepository roleRepository;
	
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

	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);
		if(user == null) {
			throw new UsernameNotFoundException("Email not found");
		}
		return user;
	}

}
