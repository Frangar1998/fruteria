package ual.dra.fruteria.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ual.dra.fruteria.models.Pedido;

@RepositoryRestResource
public interface PedidoRepository extends CrudRepository<Pedido, Long> {

    Optional<Pedido> findById(Long id);
}