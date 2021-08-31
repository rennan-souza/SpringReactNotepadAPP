package renan.notepadapp.dtos;

import java.io.Serializable;
import java.time.Instant;

import renan.notepadapp.entities.PasswordRecoveryToken;

public class PasswordRecoveryTokenDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private Long userId;
	private String token;
	private Instant createdAt;
	private Instant expiresAt;

	public PasswordRecoveryTokenDTO() {
	}

	public PasswordRecoveryTokenDTO(Long id, Long userId, String token, Instant createdAt, Instant expiresAt) {
		this.id = id;
		this.userId = userId;
		this.token = token;
		this.createdAt = createdAt;
		this.expiresAt = expiresAt;
	}

	public PasswordRecoveryTokenDTO(PasswordRecoveryToken entity) {
		id = entity.getId();
		userId = entity.getUserId();
		token = entity.getToken();
		createdAt = entity.getCreatedAt();
		expiresAt = entity.getExpiresAt();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public Instant getExpiresAt() {
		return expiresAt;
	}

	public void setExpiresAt(Instant expiresAt) {
		this.expiresAt = expiresAt;
	}
}
