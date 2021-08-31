package renan.notepadapp.controllers;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import renan.notepadapp.dtos.UserDTO;
import renan.notepadapp.dtos.UserInsertDTO;
import renan.notepadapp.dtos.UserResetPasswordDTO;
import renan.notepadapp.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserController {
			
	@Autowired
	private UserService userService;
	
	@PostMapping(value = "/signup")
	public ResponseEntity<UserDTO> insert(@Valid @RequestBody UserInsertDTO dto) {
		UserDTO newDto = userService.signup(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);
	}
	
	@GetMapping
	public ResponseEntity<Page<UserDTO>> findAll(Pageable pageable) {
		Page<UserDTO> list = userService.findAllPaged(pageable);
		return ResponseEntity.ok(list);
	}
	
	@PostMapping(value = "/recover")
	public ResponseEntity<Void> recover(@RequestBody UserDTO dto) {
		userService.recover(dto.getEmail());
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping(value = "/reset")
	public ResponseEntity<Void> reset(@RequestBody UserResetPasswordDTO dto) {
		userService.reset(dto);
		return ResponseEntity.noContent().build();
	}
}
