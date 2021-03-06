package ual.dra.fruteria.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ual.dra.fruteria.models.Product;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {

}