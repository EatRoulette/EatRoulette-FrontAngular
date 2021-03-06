import { Injectable } from '@angular/core';
import {Service} from '../service';
import {UserService} from '../user/user.service';


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
    const token = this.userService.getToken();
    return this.service.post('/restaurant/add/'+ token, restaurant);
  }

  choose(list, id) {
    const token = this.userService.getToken();
    return this.service.post('/gotoRestaurant/user/'+ token, {friendList : list, restaurant: id});
  }

  roll(filters) {
    const token = this.userService.getToken();
    if (token){
      return this.service.post('/restaurant/roll/' + token, filters)
    }else{
      return this.service.post('/restaurant/rand', filters)
    }
  }

  getRestaurantTypes(){
    return this.service.get('/type/restaurant/')
  }

  getAllRestaurants(){
    return this.service.get('/restaurants');
  }

  getRestaurantById(id: string){
    return this.service.get('/restaurant/' + id);
  }

}
