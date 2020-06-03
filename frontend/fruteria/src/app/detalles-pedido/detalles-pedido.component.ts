import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalles-pedido',
  templateUrl: './detalles-pedido.component.html',
  styleUrls: ['./detalles-pedido.component.css']
})
export class DetallesPedidoComponent implements OnInit {

  @Input() productos: any;

  constructor() { }

  ngOnInit(): void {
  }

}
