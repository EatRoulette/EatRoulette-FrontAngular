import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {EventService} from "../../services/event/event.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isConnected: boolean = false;
  userService: UserService;
  eventService: EventService;
  subscription: any;

  constructor(private router: Router, userService: UserService, eventService: EventService) {
    this.userService = userService;
    this.eventService = eventService;
  }

  ngOnInit(): void {
    this.subscription = this.eventService.tokenChange.subscribe(token => this.isConnected = !!token)
    this.isConnected = this.userService.isLoggedIn;
  }

  navigate(link: string){
    this.router.navigate([link])
  }

}
