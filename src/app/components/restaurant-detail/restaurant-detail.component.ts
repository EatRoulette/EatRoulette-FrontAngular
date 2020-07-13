import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant} from '../../data/restaurant';
import {ListsService} from '../../services/lists/lists.service';
import {List} from '../../data/list';
import {GeocoderStatus, GoogleMapsAPIWrapper, MapsAPILoader} from "@agm/core";

declare var google: any;

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
}

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  lists: List[];
  list: List = undefined;
  restaurantService: RestaurantService;
  listService: ListsService;
  idRestaurant: string;
  restaurant: Restaurant;
  isLoading: boolean = false;
  hasCoordinates: boolean = false;
  isRoll: boolean = false;
  message: string;
  errorMessage: string;
  successMessage: string;
  lat: number = 0;
  lng: number = 0;
  geocoder: any;
  public location:Location = {
    lat: 51.678418,
    lng: 7.809007,
  };

  constructor(public mapsApiLoader: MapsAPILoader, private wrapper: GoogleMapsAPIWrapper, private route: ActivatedRoute,  restaurantService: RestaurantService, listsService: ListsService) {
    this.restaurantService = restaurantService;
    this.listService = listsService;
    this.mapsApiLoader = mapsApiLoader;
    this.wrapper = wrapper;
  }

  ngOnInit(): void {
    this.idRestaurant = this.route.snapshot.paramMap.get('idRestaurant');
    this.isRoll = this.route.snapshot.paramMap.get('from') === "roll";
    this.restaurantService.getRestaurantById(this.idRestaurant).subscribe(
      (data) => {
        this.restaurant = data;
        this.mapsApiLoader.load().then(() => {
          this.geocoder = new google.maps.Geocoder();
          this.getCoordinates();
        });
        this.listService.getLists().subscribe(
          (lists: List[]) => {
            this.isLoading = false;
            this.lists = lists;
          },
          (error: any) => {
            this.isLoading = false;
            console.error(error);
          });
      },
      (error: any) => {
        this.isLoading = false;
        this.message = error.error.message ? error.error.message : 'Une erreur est survenue';
        console.error(error);
      });
  }

  getCoordinates(){
    if(this.restaurant){
      const address = this.restaurant.address + " " + this.restaurant.postalCode + " " + this.restaurant.city
      if (!this.geocoder){
        this.geocoder = new google.maps.Geocoder();
      }
      this.geocoder.geocode({
        'address': address
      }, (results, status) => {
        if (status == GeocoderStatus.OK) {
          this.hasCoordinates = true;
          this.location = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
        } else {
          console.log("Sorry, this search produced no results.");
        }
      })
    } else {
      console.log("no restaurant loaded yet")
    }
  }

  addRestaurantToList(){
    this.listService.addNewRestaurant(this.idRestaurant, this.list.id).subscribe(
      (lists: any) => {
        this.lists = lists;
        this.successMessage = 'Restaurant bien ajouté !';
      },
      (error: any) => {
        this.errorMessage = error && error.error ? error.error.message : "Une erreur est survenue";
        console.error(error);
      });
  }

  selectValue(event){
    this.list = this.lists.find(l => l.id === event.target.value);
  }

  choose(){
    // TODO
    console.log('choose clicked');
  }

}
