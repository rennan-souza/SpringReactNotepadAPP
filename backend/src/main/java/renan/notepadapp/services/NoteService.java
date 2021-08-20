package renan.notepadapp.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import renan.notepadapp.dtos.NoteDTO;
import renan.notepadapp.entities.Note;
import renan.notepadapp.entities.User;
import renan.notepadapp.repositories.NoteRepository;
import renan.notepadapp.services.exceptions.ResourceBadRequest;
import renan.notepadapp.services.exceptions.ResourceNotFoundException;

@Service
public class NoteService {

	@Autowired
	private NoteRepository noteRepository;

	@Autowired
	private AuthService authService;

	@Transactional
	public NoteDTO insert(NoteDTO dto) {

		User user = authService.authenticated();

		boolean verifyTitle = noteRepository.existsByTitleAndUser(dto.getTitle(), user);

		if (verifyTitle) {
			throw new ResourceBadRequest("Título já cadastrado");
		}

		Note entity = new Note();

		entity.setTitle(dto.getTitle());
		entity.setContent(dto.getContent());

		entity.setUser(user);

		entity = noteRepository.save(entity);
		return new NoteDTO(entity);
	}

	@Transactional(readOnly = true)
	public List<NoteDTO> findAllNoteByUser() {
		User user = authService.authenticated();
		List<Note> list = noteRepository.findByUser(user);
		return list.stream().map(x -> new NoteDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public NoteDTO findById(Long id) {
		User user = authService.authenticated();
		Optional<Note> obj = noteRepository.findByUserAndId(user, id);
		Note entity = obj.orElseThrow(() -> new ResourceNotFoundException("Nota não encontrado"));
		return new NoteDTO(entity);
	}

	@Transactional
	public NoteDTO update(Long id, NoteDTO dto) {

		User user = authService.authenticated();

		Optional<Note> obj = noteRepository.findByUserAndId(user, id);
		Note entity = obj.orElseThrow(() -> new ResourceNotFoundException("Nota não encontrado"));

		if (!entity.getTitle().equals(dto.getTitle())) {
			boolean verifyTitle = noteRepository.existsByTitleAndUser(dto.getTitle(), user);

			if (verifyTitle) {
				throw new ResourceBadRequest("Título já cadastrado");
			}
		}

		entity.setTitle(dto.getTitle());
		entity.setContent(dto.getContent());
		entity = noteRepository.save(entity);
		return new NoteDTO(entity);

	}

	@Transactional
	public void delete(Long id) {

		User user = authService.authenticated();

		Optional<Note> obj = noteRepository.findByUserAndId(user, id);
		Note entity = obj.orElseThrow(() -> new ResourceNotFoundException("Nota não encontrado"));

		noteRepository.deleteById(entity.getId());
	}
}
