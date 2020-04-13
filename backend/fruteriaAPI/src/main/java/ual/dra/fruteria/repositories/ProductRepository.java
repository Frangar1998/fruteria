package ual.dra.fruteria.repositories;

import org.springframework.data.repository.CrudRepository;
import ual.dra.fruteria.models.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

}