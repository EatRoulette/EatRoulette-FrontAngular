import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class Service {
  Url: string;
  header: any;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:3000';
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }

  getToken() {
    const token = localStorage.getItem('access_token');
    if (token){
      return token;
    }
    return '';
  }

  get(url) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'x-access-token': this.getToken() }) };
    return this.http.get<any>(this.Url + url, httpOptions)
  }
  post(url, body) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'x-access-token': this.getToken() }) };
    return this.http.post<any>(this.Url + url, body, httpOptions)
  }
  delete(url) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'x-access-token': this.getToken() }) };
    return this.http.delete<any>(this.Url + url, httpOptions)
  }
  put(url, body) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*', 'x-access-token': this.getToken() }) };
    return this.http.put<any>(this.Url + url, body, httpOptions)
  }

}
