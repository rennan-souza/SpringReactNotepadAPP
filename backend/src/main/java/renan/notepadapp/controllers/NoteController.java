package renan.notepadapp.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import renan.notepadapp.dtos.NoteDTO;
import renan.notepadapp.services.NoteService;

@RestController
@RequestMapping(value = "/notes")
public class NoteController {

	@Autowired
	private NoteService noteService;

	@PostMapping
	public ResponseEntity<NoteDTO> insert(@Valid @RequestBody NoteDTO dto) {
		dto = noteService.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

	@GetMapping
	public ResponseEntity<List<NoteDTO>> findAllNoteByUser() {
		List<NoteDTO> list = noteService.findAllNoteByUser();
		return ResponseEntity.ok(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<NoteDTO> findById(@PathVariable Long id) {
		NoteDTO dto = noteService.findById(id);
		return ResponseEntity.ok(dto);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<NoteDTO> update(@PathVariable Long id, @Valid @RequestBody NoteDTO dto) {
		dto = noteService.update(id, dto);
		return ResponseEntity.ok(dto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		noteService.delete(id);
		return ResponseEntity.noContent().build();
	}
}
