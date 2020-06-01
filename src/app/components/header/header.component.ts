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
  subscription: any;
  userName: string;

  constructor(private router: Router, userService: UserService, eventService: EventService) {
    this.userService = userService;
    this.eventService = eventService;
  }

  ngOnInit(): void {
    this.subscription = this.eventService.tokenChange.subscribe(token => this.isConnected = !!token)
    this.isConnected = this.userService.isLoggedIn;
    const user: User = this.userService.getStoredUser()
    if(user && this.isConnected){
      this.userName = user.firstName;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigate(link: string){
    this.router.navigate([link])
  }

}
