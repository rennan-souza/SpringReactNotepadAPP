package renan.notepadapp.dtos;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import renan.notepadapp.entities.Note;

public class NoteDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "Campo requerido")
	private String title;

	@NotBlank(message = "Campo requerido")
	private String content;

	public NoteDTO() {
	}

	public NoteDTO(Long id, String title, String content) {
		this.id = id;
		this.title = title;
		this.content = content;
	}

	public NoteDTO(Note entity) {
		id = entity.getId();
		title = entity.getTitle();
		content = entity.getContent();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
}
