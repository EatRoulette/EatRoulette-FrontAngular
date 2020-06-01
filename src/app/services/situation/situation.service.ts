import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Situation } from "../../data/situation";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})

export class SituationService {
  Url: string;
  header: any;
  userService: UserService;

  constructor(private http: HttpClient, userService: UserService) {
    this.Url = 'http://localhost:3000';
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
    this.userService = userService;
  }
  getSituation() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.get<Situation>(this.Url + '/situation/' + this.userService.getToken(), httpOptions)
  }
  updateSituation(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.post<undefined>(this.Url + '/situation/' + this.userService.getToken(), data, httpOptions)
  }
}
