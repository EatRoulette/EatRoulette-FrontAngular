import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {EventService} from "../../services/event/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userService: UserService;
  eventService: EventService;
  isConnected: boolean = false;
  subscription: any;

  constructor(private router: Router, userService: UserService, eventService: EventService) {
    this.userService = userService
    this.eventService = eventService
  }

  ngOnInit(): void {
    this.subscription = this.eventService.tokenChange.subscribe(token => this.isConnected = !!token)
    this.isConnected = this.userService.isLoggedIn
  }

  navigate(link: string){
    this.router.navigate([link])
  }

  logout(){
    this.userService.doLogout()
    this.eventService.tokenChange.emit(undefined);
    this.navigate('login')
  }

}
