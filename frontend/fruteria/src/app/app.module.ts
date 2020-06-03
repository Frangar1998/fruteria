import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { DetallesPedidoComponent } from './detalles-pedido/detalles-pedido.component';
import { NuevoPedidoComponent } from './nuevo-pedido/nuevo-pedido.component';
import { ProductosComponent } from './productos/productos.component';
import { AdminComponent } from './admin/admin.component';
import { ModComponent } from './mod/mod.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    PedidosComponent,
    DetallesPedidoComponent,
    NuevoPedidoComponent,
    ProductosComponent,
    AdminComponent,
    ModComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
