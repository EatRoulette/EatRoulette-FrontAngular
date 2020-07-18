import { Injectable } from '@angular/core';
import {Service} from '../service';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  service: Service;
  userService: UserService;

  constructor(service: Service, userService: UserService) {
    this.service = service;
    this.userService = userService;
  }

  getHistoryUser(){
    return this.service.get('/frontTracking/restaurant/user/' + this.userService.getToken());
  }

  getHistoryOneRestaurantWithUser(idRestaurant){
    return this.service.get('/historic/restaurant/' + this.userService.getToken() + '/' + idRestaurant);
  }


}
