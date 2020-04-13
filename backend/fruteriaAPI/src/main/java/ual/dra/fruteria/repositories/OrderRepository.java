package ual.dra.fruteria.repositories;

import org.springframework.data.repository.CrudRepository;
import ual.dra.fruteria.models.Order;

public interface OrderRepository extends CrudRepository<Order, Long> {

}