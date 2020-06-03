package ual.dra.fruteria.controllers;

import java.util.List;

import javax.annotation.security.PermitAll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ual.dra.fruteria.models.User;
import ual.dra.fruteria.models.Product;
import ual.dra.fruteria.repositories.ProductRepository;
import ual.dra.fruteria.repositories.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestController
public class ProductsController {

    @Autowired
    ProductRepository productRepo;

    @GetMapping(path = "/products")
	public ResponseEntity getAllProducts() {
        try {
            List<Product> products = productRepo.findAll();
            if(products != null){
                return new ResponseEntity<List<Product>>(products, HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<String>("Products not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<String>("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}