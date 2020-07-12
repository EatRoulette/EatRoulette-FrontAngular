import { Injectable } from '@angular/core';
import { Register } from 'src/app/data/register';
import { Login } from 'src/app/data/login';
import {User} from "../../data/user";
import {Service} from "../service";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }
  Subscribe(register: Register) {
    return this.service.post('/auth/subscribe/', register)
  }
  Login(login: Login) {
    return this.service.post('/auth/login/', login)
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null);
  }
  doLogout() {
    this.service.delete('/auth/logout/' + this.getToken())
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
  getUser() {
    return this.service.get('/user/' + this.getToken())
  }
  storeUser(user: User){
    localStorage.setItem('user', JSON.stringify(user))
  }
  getStoredUser(): User{
    return JSON.parse(localStorage.getItem('user'));
  }
  updateUser(user: User) {
    return this.service.post('/user/update/'+ this.getToken(), user)
  }
}
