import {Component, Input, OnInit} from '@angular/core';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant} from '../../data/restaurant';
import {ListsService} from '../../services/lists/lists.service';
import {List} from '../../data/list';
import {GeocoderStatus, GoogleMapsAPIWrapper, MapsAPILoader} from "@agm/core";
import {UserService} from "../../services/user/user.service";

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
  userService: UserService;
  idRestaurant: string;
  restaurant: Restaurant;
  isLoading: boolean = false;
  isMapLoading: boolean = true;
  hasCoordinates: boolean = false;
  isConnected: boolean = false;
  isRoll: boolean = false;
  message: string;
  friendList: string;
  errorMessage: string;
  errorMapMessage: string;
  successMessage: string;
  validationTitle: string;
  geocoder: any;
  public location:Location = {
    lat: 51.678418,
    lng: 7.809007,
  };

  constructor(public mapsApiLoader: MapsAPILoader, private wrapper: GoogleMapsAPIWrapper, private route: ActivatedRoute,
              restaurantService: RestaurantService, listsService: ListsService, userService: UserService) {
    this.restaurantService = restaurantService;
    this.listService = listsService;
    this.mapsApiLoader = mapsApiLoader;
    this.wrapper = wrapper;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.idRestaurant = this.route.snapshot.paramMap.get('idRestaurant');
    this.friendList = this.route.snapshot.paramMap.get('friendList');
    const from = this.route.snapshot.paramMap.get('from')
    this.isRoll =  from === "roll" || from === "validation";
    if(from === "validation"){
      this.validationTitle = "Bon Appetit !";
    }
    this.isConnected = this.userService.isLoggedIn;

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
          this.errorMapMessage = null;
          this.hasCoordinates = true;
          this.isMapLoading = false;
          this.location = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
        } else {
          this.errorMapMessage = "Désolé, la carte ne peut pas être affichée.";
          console.log("Sorry, this search produced no results.");
        }
      })
    } else {
      this.errorMapMessage = "Un erreur est survenue.";
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
    this.restaurantService.choose(this.friendList, this.restaurant.id).subscribe(
      (ret) => {
        this.validationTitle = "Bon appetit ! ";
      },
      (error: any) => {
        this.errorMessage = error && error.error ? error.error.message : "Une erreur est survenue";
        console.error(error);
      }
    )
    console.log('choose clicked');
  }

}
