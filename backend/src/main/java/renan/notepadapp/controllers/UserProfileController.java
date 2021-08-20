package renan.notepadapp.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import renan.notepadapp.dtos.UserDTO;
import renan.notepadapp.dtos.UserProfileUpdateDTO;
import renan.notepadapp.dtos.UserProfileUpdatePasswordDTO;
import renan.notepadapp.services.UserProfileService;

@RestController
@RequestMapping(value = "/profile")
public class UserProfileController {
	
	@Autowired
	private UserProfileService userProfileService;

	@GetMapping
	public ResponseEntity<UserDTO> profile() {
		UserDTO dto = userProfileService.profile();
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping
	public ResponseEntity<UserDTO> updateProfile(@Valid @RequestBody UserProfileUpdateDTO dto) {
		UserDTO newDto = userProfileService.updateProfile(dto);
		return ResponseEntity.ok().body(newDto);
	}
	
	@PutMapping(value = "/pass")
	public ResponseEntity<Void> updatePassword(@Valid @RequestBody UserProfileUpdatePasswordDTO dto) {
		userProfileService.updatePassword(dto);
		return ResponseEntity.noContent().build();
	}
}