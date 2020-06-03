import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nuevo-pedido',
  templateUrl: './nuevo-pedido.component.html',
  styleUrls: ['./nuevo-pedido.component.css']
})
export class NuevoPedidoComponent implements OnInit {

  productos;
  productosEnPedido = [];
  cantidadProductos = [];
  precioProductos = [];
  productosParaForm = [];
  productosParaEliminar = [];

  precioTotal = 0;

  form: any = {};
  isSuccessful = false;
  postFailed = false;
  errorMessage = "";

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  onSubmit() {
    this.form.payment = this.precioTotal;
    this.form.orderDate = new Date();
    this.form.state = false;
    this.userService.postPedido(this.tokenStorageService.getUser().username, this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.postFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.postFailed = true;
      }
    );
  }

  getProductos(){
    this.userService.getProductos().subscribe((data:any) => {
      this.productos = data;
    });
  }

  addProducto(producto, i){
    if(!this.productosEnPedido.includes(producto.name)){
      this.productosEnPedido.push(producto.name);
      this.cantidadProductos.push(1);
      this.precioProductos.push(producto.price);
    } else {
      this.cantidadProductos[this.productosEnPedido.indexOf(producto.name)]++;
      this.precioProductos[this.productosEnPedido.indexOf(producto.name)] += producto.price;
    }
    this.precioTotal += producto.price;
    this.productosParaEliminar.push(producto);
    this.productosParaForm.push({"id":producto.id});
    this.form.numberOfProducts = this.productosParaForm.length;
    this.form.products = this.productosParaForm;
  }

  removeProducto(producto, i){
    for(let prod of this.productosParaEliminar){
      if(prod.name == producto){
        this.precioTotal -= prod.price;
        this.cantidadProductos[i]--;
        this.precioProductos[i] = this.precioProductos[i] - prod.price;
        if(this.cantidadProductos[i] == 0){
          this.cantidadProductos.splice(i,1);
          this.precioProductos.splice(i,1);
          this.productosEnPedido.splice(this.productosEnPedido.indexOf(producto),1);
        }
        this.productosParaForm.splice(this.productosParaEliminar.indexOf(prod),1);
        this.productosParaEliminar.splice(this.productosParaEliminar.indexOf(prod),1);
        break;
      }
    }
    this.form.products = this.productosParaForm;
    console.log(this.form.products);
    console.log(this.productosParaEliminar);
    console.log(this.productosParaForm);
  }

  textualdate(date){
    let shownDate = new Date(date);
    return shownDate.toDateString();
  }

}
