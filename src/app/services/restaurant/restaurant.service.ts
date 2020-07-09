import { Injectable } from '@angular/core';
import {Service} from '../service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  addRestaurant(restaurant) {
    return this.service.post('/restaurant/add/', restaurant);
  }

  getAllRestaurants(){
    return this.service.get('/restaurants');
  }

  getRestaurantById(id: string){
    return this.service.get('/restaurant/' + id);
  }

}
