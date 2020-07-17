import {Component, Input, OnInit} from '@angular/core';
import {Restaurant} from "../../../data/restaurant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css']
})
export class RestaurantItemComponent implements OnInit {
  @Input() restaurant: Restaurant;
  @Input() isRoll: boolean = false;
  @Input() friendList: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  see(){
    this.router.navigate(['restaurant/' + this.restaurant.id + (this.isRoll ? "/roll" : "/search") +
    (this.isRoll ? "/" + (this.friendList? this.friendList : "-1") : "-1")])
  }

}
