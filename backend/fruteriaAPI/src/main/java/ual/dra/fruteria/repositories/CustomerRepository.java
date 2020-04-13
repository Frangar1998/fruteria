package ual.dra.fruteria.repositories;

import org.springframework.data.repository.CrudRepository;
import ual.dra.fruteria.models.Customer;

public interface CustomerRepository extends CrudRepository<Customer, Long> {

}