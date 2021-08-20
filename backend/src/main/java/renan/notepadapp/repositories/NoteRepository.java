package renan.notepadapp.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import renan.notepadapp.entities.Note;
import renan.notepadapp.entities.User;

public interface NoteRepository extends JpaRepository<Note, Long> {

	boolean existsByTitleAndUser(String title, User user);

	List<Note> findByUser(User user);

	Optional<Note> findByUserAndId(User user, Long id);
}
