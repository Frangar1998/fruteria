import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import { LoginComponent } from './login/login.component';
import { NuevoPedidoComponent } from './nuevo-pedido/nuevo-pedido.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';
import { AdminComponent } from './admin/admin.component';
import { ModComponent } from './mod/mod.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  { path: '', component: PrincipalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
