import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Allergen } from "../../data/allergen";

@Injectable({
  providedIn: 'root'
})

export class AllergenService {
  Url: string;
  header: any;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:3000';
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  getAllergens() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.get<Allergen[]>(this.Url + '/allergens/', httpOptions)
  }
}
