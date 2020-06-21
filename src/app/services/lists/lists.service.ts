import { Injectable } from '@angular/core';
import {Service} from "../service";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  service: Service;
  userService: UserService;

  constructor(service: Service, userService: UserService) {
    this.service = service;
    this.userService = userService;
  }

  // todo right urls

  search(searchValues) {
    return this.service.post('/TODO/search', searchValues)
  }
  addList(name) {
    return this.service.post('/myRestaurantList/new/' + this.userService.getToken(), {name})
  }
  deleteList(id) {
    return this.service.delete('/TODO/'+ id)
  }
  addNewRestaurant(idRestaurant, idList) {
    return this.service.post('/TODO/add/' + this.userService.getToken(), {idRestaurant, idList})
  }
  deleteRestaurant(idRestaurant, idList) {
    return this.service.post('/TODO/delete/' + this.userService.getToken(), {idRestaurant, idList})
  }
  getLists() {
    return this.service.get('/myRestaurantList/' + this.userService.getToken())
  }
}
