package ual.dra.fruteria.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import ual.dra.fruteria.models.User;
import ual.dra.fruteria.models.Pedido;
import ual.dra.fruteria.repositories.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestController
public class UserController {

    @Autowired
    UserRepository userRepo;

    @GetMapping(path = "/users/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity getUserByUsername(@PathVariable("username") String username) {
        try {
            User user = userRepo.findByUsername(username).get();
            if(user != null){
                return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<String>("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/users")
    @PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity getAllUsers() {
        try {
            List<User> aux = userRepo.findAll();
            List<User> users = new ArrayList<User>();
            for (User user : aux) {
                if(!user.getUsername().equals("admin") && !user.getUsername().equals("mod")){
                    users.add(user);
                }
            }
            if(!users.isEmpty()){
                return new ResponseEntity<List<User>>(users, HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<String>("Users not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<String>("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}