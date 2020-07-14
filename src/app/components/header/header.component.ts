import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {EventService} from "../../services/event/event.service";
import {User} from "../../data/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  token: string;

  isConnected: boolean = false;
  userService: UserService;
  eventService: EventService;
  subscriptionToken: any;
  subscriptionUser: any;
  userName: string;

  constructor(private router: Router, userService: UserService, eventService: EventService) {
    this.userService = userService;
    this.eventService = eventService;
  }

  ngOnInit(): void {
    this.subscriptionToken = this.eventService.tokenChange.subscribe(token => this.isConnected = !!token)
    this.subscriptionUser = this.eventService.userChange.subscribe(firstName => this.userName = firstName)
    this.isConnected = this.userService.isLoggedIn;
    if(!this.userName){
      const user: User = this.userService.getStoredUser();
      if(user && this.isConnected){
        this.userName = user.firstName;
      }
    }

  }

  ngOnDestroy() {
    this.subscriptionToken.unsubscribe();
    this.subscriptionUser.unsubscribe();
  }

  navigate(link: string){
    this.router.navigate([link])
  }

}
