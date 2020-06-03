package ual.dra.fruteria.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ual.dra.fruteria.models.ERole;
import ual.dra.fruteria.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
	Optional<Role> findByName(ERole name);
}