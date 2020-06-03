import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(){
    this.userService.getPedidos(this.tokenStorageService.getUser().username).subscribe((data:any) =>{
      this.pedidos = data;
    });
  }

  textualdate(date){
    let shownDate = new Date(date);
    return shownDate.toDateString();
  }

}
