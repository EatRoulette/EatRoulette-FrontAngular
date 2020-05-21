import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Register } from 'src/app/data/register';
import { Login } from 'src/app/data/login';
import {User} from "../../data/user";
import {Support} from "../../data/support";

@Injectable({
  providedIn: 'root'
})

export class SupportService {
  Url: string;
  header: any;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:3000';
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  sendSupportRequest(support: Support) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.post<Register[]>(this.Url + '/support', support, httpOptions)
  }
}
