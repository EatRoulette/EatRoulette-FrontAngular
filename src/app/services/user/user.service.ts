import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Register } from 'src/app/components/register/register';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  Url: string;
  token: string;
  header: any;
  constructor(private http: HttpClient) {

    this.Url = 'http://localhost:3000/';

    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  Subscribe(register: Register) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Register[]>(this.Url + '/auth/subscribe/', register, httpOptions)
  }
}  