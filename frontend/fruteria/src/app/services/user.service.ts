import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:8082/api/test/';
const Products_URL = 'http://localhost:8082/products';
const User_URL = 'http://localhost:8082/users/';
const Pedidos_URL = 'http://localhost:8082/pedidoes';
const Users_URL = 'http://localhost:8082/users'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getProductos(): Observable<any>{
    return this.http.get(Products_URL);
  }

  getUser(username): Observable<any>{
    return this.http.get(User_URL + username);
  }

  getPedidos(username): Observable<any>{
    return this.http.get(Pedidos_URL + "/" + username);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokenStorageService.getToken()})
  };

  postPedido(username, pedido): Observable<any>{
    return this.http.post(Pedidos_URL + "?username="+username+"", pedido, this.httpOptions)
  }

  getUsers(): Observable<any>{
    return this.http.get(Users_URL,this.httpOptions);
  }

  getAllPedidos(): Observable<any>{
    return this.http.get(Pedidos_URL, this.httpOptions);
  }

  updateStatePedido(id): Observable<any>{
    return this.http.post(Pedidos_URL + "/update",id, this.httpOptions);
  }

}
