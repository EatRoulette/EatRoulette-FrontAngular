import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Register } from 'src/app/data/register';
import { Login } from 'src/app/data/login';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  Url: string;
  token: string;
  header: any;

  constructor(private http: HttpClient) {

    this.Url = 'http://localhost:3000';

    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  Subscribe(register: Register) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.post<Register[]>(this.Url + '/auth/subscribe/', register, httpOptions)
  }
  Login(login: Login) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.post<Register[]>(this.Url + '/auth/login/', login, httpOptions)
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null);
  }
  doLogout() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    this.http.delete(this.Url + '/auth/logout/' + this.getToken(), httpOptions)
  }
}
