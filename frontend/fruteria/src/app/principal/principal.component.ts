import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  content: string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  showProductos = false;
  showPrincipal = true;
  showPedidos = false;
  showNuevoPedido = false;
  showLogin = false;
  showRegistro = false;

  constructor(private userService: UserService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }else {
      this.userService.getPublicContent().subscribe(
        data => {
          this.content = data;
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
  }

  mostrarContenido(principal, productos, pedidos, nuevoPedido, login, registro){
    this.showPrincipal = principal;
    this.showProductos = productos;
    this.showPedidos = pedidos;
    this.showNuevoPedido = nuevoPedido;
    this.showLogin = login;
    this.showRegistro = registro;
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
