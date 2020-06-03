import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos;
  @Input() isAdmin;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(){
    this.userService.getProductos().subscribe((data:any) => {
      this.productos = data;
    });
  }

}
