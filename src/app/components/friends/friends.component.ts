import { Component, OnInit } from '@angular/core';
import {Group} from "../../data/group";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  groups: Group[];
  group: Group = undefined;

  constructor() { }

  ngOnInit(): void {
    // todo mock data => call api to fetch groups for user
    this.groups = [
      {
        id:"1",
        name:"group 1",
        friends: [
          {
            id: "1",
              firstName: "FirstName11",
              lastName: "lastName11"
          },
          {
            id: "2",
            firstName: "FirstName12",
            lastName: "lastName 12",
          },
          {
            id: "2",
            firstName: "FirstName12",
            lastName: "lastName 12",
          },
          {
            id: "2",
            firstName: "FirstName12",
            lastName: "lastName 12",
          },
          {
            id: "2",
            firstName: "FirstName12",
            lastName: "lastName 12",
          },
          {
            id: "2",
            firstName: "FirstName12",
            lastName: "lastName 12",
          }
        ],
      },
      {
        id:"2",
        name:"group 2",
        friends: [
          {
            id: "3",
            firstName: "FirstName21",
            lastName: "lastName21"
          }
        ],
      },
      {
        id:"3",
        name:"group 3",
        friends: [
          {
            id: "5",
            firstName: "FirstName31",
            lastName: "lastName31"
          },
          {
            id: "6",
            firstName: "FirstName32",
            lastName: "lastName 32",
          },
          {
            id: "4",
            firstName: "FirstName34",
            lastName: "lastName 32eee",
          }
        ],
      }
    ]
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
