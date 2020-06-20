import { Component, OnInit } from '@angular/core';
import {Group} from "../../data/group";
import {FriendsService} from "../../services/friends/friends.service";
import {User} from "../../data/user";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  groups: Group[];
  group: Group = undefined;
  friendsService: FriendsService;
  isLoading: boolean = false;

  constructor(friendsService: FriendsService) {
    this.friendsService = friendsService;
  }

  ngOnInit(): void {
    this.isLoading = true; // todo display pizza loader into html
    this.friendsService.getGroups().subscribe(
      (groups: Group[]) => {
        this.isLoading = false;
        this.groups = groups;
      },
      (error: any) => {
        this.isLoading = false;
        console.error(error);
      })
  }

  selectValue(event){
    this.group = this.groups.find(g => g.id === event.target.value)
  }

  delete(id: string){
    //todo delete => call api
  }

  addNewGroup(){
    // todo add => go to new group form
  }

  addNewFriendToGroup(){
    // todo add => go to new friend form (with group already filled)
  }

}
