import { Injectable } from '@angular/core';
import {Service} from "../service";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  service: Service;
  userService: UserService;

  constructor(service: Service, userService: UserService) {
    this.service = service;
    this.userService = userService;
  }

  addRestaurant(restaurant) {
    return this.service.post('/restaurant/add/', restaurant)
  }

  roll(filters) {
    const token = this.userService.getToken()
    return this.service.post('/restaurant/roll/' + token? token : '', filters)
  }

  getRestaurantTypes(){
    return this.service.get('/type/restaurant/')
  }
}
