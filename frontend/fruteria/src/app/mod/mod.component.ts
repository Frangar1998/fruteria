import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-mod',
  templateUrl: './mod.component.html',
  styleUrls: ['./mod.component.css']
})
export class ModComponent implements OnInit {

  pedidos;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  getPedidos(){
    this.userService.getAllPedidos().subscribe((data:any) =>{
      this.pedidos = data;
    });
  }

  textualdate(date){
    let shownDate = new Date(date);
    return shownDate.toDateString();
  }

  donePedido(id){
    console.log(id);
    this.userService.updateStatePedido(id).subscribe(data => {
      console.log(data);
    });
  }

}
