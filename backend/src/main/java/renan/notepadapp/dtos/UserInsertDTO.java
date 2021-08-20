package renan.notepadapp.dtos;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import renan.notepadapp.services.validation.UserInsertValid;

@UserInsertValid
public class UserInsertDTO extends UserDTO  {

	private static final long serialVersionUID = 1L;
	
	@Size(min = 6, message = "A senha deve conter no mínimo 6 caracteres")
	@NotBlank(message = "Campo requerido")
	private String password;
	
	UserInsertDTO() {
		super();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
