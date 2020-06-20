import { Injectable } from '@angular/core';
import {Service} from "../service";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  service: Service;
  userService: UserService;

  constructor(service: Service, userService: UserService) {
    this.service = service;
    this.userService = userService;
  }
  search(searchValues) {
    return this.service.post('/user/search', searchValues)
  }
  addNewFriend(idFriend, idGroup) {
    return this.service.post('/myFriendsListUsers/add/' + this.userService.getToken(), {idFriend, idGroup})
  }
  getGroups() {
    return this.service.get('/myFriendsListUsers/' + this.userService.getToken())
  }
}
