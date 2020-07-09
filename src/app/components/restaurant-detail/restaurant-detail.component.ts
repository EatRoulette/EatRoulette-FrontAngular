import { Component, OnInit } from '@angular/core';
import {Validators} from "@angular/forms";
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {ActivatedRoute} from "@angular/router";
import {Restaurant} from "../../data/restaurant";

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurantService: RestaurantService;
  idRestaurant: string;
  restaurant: Restaurant;
  isLoading: boolean;
  message: string;

  constructor( private route: ActivatedRoute,  restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
  }

  ngOnInit(): void {
    this.idRestaurant = this.route.snapshot.paramMap.get('idRestaurant');
    console.log(this.idRestaurant)
    // this.isLoading = true;
    this.restaurantService.getRestaurantById(this.idRestaurant).subscribe(
      (data) => {
        this.isLoading = false;
        this.restaurant = data;
      },
      (error: any) => {
        this.isLoading = false;
        this.message = error.error.message ? error.error.message : 'Une erreur est survenue';
        console.error(error);
      });
    console.log(this.restaurant);
  }

}
