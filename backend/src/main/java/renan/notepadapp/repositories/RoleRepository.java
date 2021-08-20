package renan.notepadapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import renan.notepadapp.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
