package renan.notepadapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import renan.notepadapp.entities.PasswordRecoveryToken;

@Repository
public interface PasswordRecoveryTokenRepository extends JpaRepository<PasswordRecoveryToken, Long> {

	PasswordRecoveryToken findByToken(String token);
	
	void deleteByToken(String token);
}
