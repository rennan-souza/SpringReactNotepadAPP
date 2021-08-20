package renan.notepadapp.services.exceptions;

public class ResourceBadRequest extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public ResourceBadRequest(String msg) {
		super(msg);
	}
}
