import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Characteristic} from "../../data/characteristic";

@Injectable({
  providedIn: 'root'
})

export class CharacteristicService {
  Url: string;
  header: any;

  constructor(private http: HttpClient) {
    this.Url = 'http://localhost:3000';
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  getCharacteristics() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.get<Characteristic[]>(this.Url + '/characteristics/', httpOptions)
  }
}
