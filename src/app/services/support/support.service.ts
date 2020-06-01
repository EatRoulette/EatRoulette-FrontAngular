import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Register } from 'src/app/data/register';
import {Support} from "../../data/support";
import {UserService} from "../user/user.service";
import {Ticket} from "../../data/ticket";
import {SupportComment} from "../../data/SupportComment";

@Injectable({
  providedIn: 'root'
})

export class SupportService {
  Url: string;
  header: any;
  userService: UserService;

  constructor(private http: HttpClient, userService: UserService) {
    this.Url = 'http://localhost:3000';
    const headerSettings: { [name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
    this.userService = userService;
  }
  sendSupportRequest(support: Support) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.post<Register[]>(this.Url + '/ticket/support/' + this.userService.getToken(), support, httpOptions)
  }
  getTickets() {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.get<Ticket[]>(this.Url + '/ticket/support/' + this.userService.getToken(), httpOptions)
  }
  getTicket(idTicket: string) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.get<Ticket>(this.Url + '/ticket/support/' + this.userService.getToken() + "/" + idTicket, httpOptions)
  }
  sendSupportComment(request: SupportComment) { // {idTicket: string, comment: string}
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*' }) };
    return this.http.post<Ticket>(this.Url + '/ticket/support/comment/' + this.userService.getToken(), request, httpOptions)
  }

}
