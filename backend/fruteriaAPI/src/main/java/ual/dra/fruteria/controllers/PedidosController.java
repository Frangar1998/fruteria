package ual.dra.fruteria.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ual.dra.fruteria.models.User;
import ual.dra.fruteria.models.Pedido;
import ual.dra.fruteria.models.Product;
import ual.dra.fruteria.repositories.PedidoRepository;
import ual.dra.fruteria.repositories.ProductRepository;
import ual.dra.fruteria.repositories.UserRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RepositoryRestController
public class PedidosController {

    @Autowired
    UserRepository userRepo;

    @Autowired
    PedidoRepository pedidoRepo;

    @Autowired
    ProductRepository prodRepo;

    @PostMapping(path = "/pedidoes")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity postPedidoByUsername(@RequestParam String username, @RequestBody Pedido datosPedido){
        try {
            User user = userRepo.findByUsername(username).get();
            Pedido pedido = new Pedido();
            pedido.setDeliveryDate(datosPedido.getDeliveryDate());
            pedido.setOrderDate(datosPedido.getOrderDate());
            pedido.setPayment(datosPedido.getPayment());
            pedido.setNumberOfProducts(datosPedido.getNumberOfProducts());
            System.out.println(pedido.getNumberOfProducts());
            for (Product producto : datosPedido.getProducts()) {
                pedido.getProducts().add(prodRepo.findById(producto.getId()).get());
            }
            pedidoRepo.save(pedido);
            System.out.println("Hola 3");
            user.getPedidos().add(pedido);
            pedido.setUser(user);
            pedidoRepo.save(pedido);
            userRepo.save(user);

            if(pedidoRepo.findById(pedido.getId()).get() != null){
                return new ResponseEntity<String>("Pedido created.", HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<String>("Pedido not created.", HttpStatus.EXPECTATION_FAILED);
        } catch (Exception e) {
            return new ResponseEntity<String>("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/pedidoes/{username}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public ResponseEntity getPedidosByUsername(@PathVariable("username") String username) {
        try {
            User user = userRepo.findByUsername(username).get();
            if(user != null){
                return new ResponseEntity<Set<Pedido>>(user.getPedidos(), HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<String>("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path = "/pedidoes")
    @PreAuthorize("hasRole('MODERATOR')")
	public ResponseEntity getAllPedidos() {
        try {
            List<Pedido> pedidos = new ArrayList<Pedido>();
            Iterable<Pedido> aux = pedidoRepo.findAll();
            for (Pedido pedido : aux) {
                if(!pedido.isState()){
                    pedidos.add(pedido);
                }
            }
            if(!pedidos.isEmpty()){
                return new ResponseEntity<List<Pedido>>(pedidos, HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<String>("Orders not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<String>("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/pedidoes/update")
    @PreAuthorize("hasRole('MODERATOR')")
	public ResponseEntity updateStatePedido(@RequestBody Long id){
        try {
            Pedido pedido = pedidoRepo.findById(id).get();
            pedido.setState(true);
            pedidoRepo.save(pedido);

            if(pedidoRepo.findById(pedido.getId()).get().isState()){
                return new ResponseEntity<String>("Pedido updated.", HttpStatus.ACCEPTED);
            }
            return new ResponseEntity<String>("Pedido not updated.", HttpStatus.EXPECTATION_FAILED);
        } catch (Exception e) {
            return new ResponseEntity<String>("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}