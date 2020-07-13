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
    return this.service.post('/restaurant/add/', restaurant);
  }

  choose(list) {
    const token = this.userService.getToken()
    return this.service.post('/gotoRestaurant/user/'+ token, {friendList : list});
  }

  roll(filters) {
    const token = this.userService.getToken()
    if(token){
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
