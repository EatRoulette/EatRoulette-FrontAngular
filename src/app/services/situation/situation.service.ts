import { Injectable } from '@angular/core';
import {UserService} from "../user/user.service";
import {Service} from "../service";

@Injectable({
  providedIn: 'root'
})

export class SituationService {
  service: Service;
  userService: UserService;

  constructor(service: Service, userService: UserService) {
    this.service = service;
    this.userService = userService;
  }
  getSituation() {
    return this.service.get('/situation/' + this.userService.getToken())
  }
  updateSituation(data) {
    return this.service.post('/situation/' + this.userService.getToken(), data)
  }
}
