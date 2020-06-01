import { Injectable } from '@angular/core';
import {Support} from "../../data/support";
import {UserService} from "../user/user.service";
import {SupportComment} from "../../data/SupportComment";
import {Service} from "../service";

@Injectable({
  providedIn: 'root'
})

export class SupportService {
  service: Service;
  userService: UserService;

  constructor(service: Service, userService: UserService) {
    this.userService = userService;
    this.service = service;
  }
  sendSupportRequest(support: Support) {
    return this.service.post('/ticket/support/' + this.userService.getToken(), support)
  }
  getTickets() {
    return this.service.get('/ticket/support/' + this.userService.getToken())
  }
  getTicket(idTicket: string) {
    return this.service.get('/ticket/support/' + this.userService.getToken() + "/" + idTicket)
  }
  sendSupportComment(request: SupportComment) {
    return this.service.post('/ticket/support/comment/' + this.userService.getToken(), request)
  }

}
