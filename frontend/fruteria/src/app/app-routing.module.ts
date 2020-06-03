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
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'detalles-pedido', component: DetallesPedidoComponent },
  { path: 'nuevo-pedido', component: NuevoPedidoComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'mod', component: ModComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
