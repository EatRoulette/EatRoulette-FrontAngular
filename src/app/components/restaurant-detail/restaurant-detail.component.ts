import { Component, OnInit } from '@angular/core';
import {RestaurantService} from '../../services/restaurant/restaurant.service';
import {ActivatedRoute} from '@angular/router';
import {Restaurant} from '../../data/restaurant';
import {ListsService} from '../../services/lists/lists.service';
import {List} from '../../data/list';

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
  isRoll: boolean = false;
  message: string;
  successMessage: string;

  constructor( private route: ActivatedRoute,  restaurantService: RestaurantService, listsService: ListsService) {
    this.restaurantService = restaurantService;
    this.listService = listsService;
  }

  ngOnInit(): void {
    this.idRestaurant = this.route.snapshot.paramMap.get('idRestaurant');
    this.isRoll = this.route.snapshot.paramMap.get('from') === "roll";
    this.restaurantService.getRestaurantById(this.idRestaurant).subscribe(
      (data) => {
        this.restaurant = data;
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

  addRestaurantToList(){
    console.log(this.idRestaurant);
    console.log(this.list.id);
    this.listService.addNewRestaurant(this.idRestaurant, this.list.id).subscribe(
      (lists: any) => {
        this.lists = lists;
        this.successMessage = 'Restaurant bien ajouté !';
      },
      (error: any) => {
        console.error(error);
      });
  }

  selectValue(event){
    this.list = this.lists.find(l => l.id === event.target.value);
    console.log(this.list);
  }

  choose(){
    // TODO
    console.log('choose clicked');
  }

}
