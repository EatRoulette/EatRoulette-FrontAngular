import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../data/user";
import {Router} from "@angular/router";
import {List} from "../../data/list";
import {ListsService} from "../../services/lists/lists.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Restaurant} from "../../data/restaurant";
import {Characteristic} from "../../data/characteristic";
import {Allergen} from "../../data/allergen";
import {Type} from "../../data/type";
import {AllergenService} from "../../services/allergen/allergen.service";
import {CharacteristicService} from "../../services/characteristic/characteristic.service";
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {Group} from "../../data/group";
import {FriendsService} from "../../services/friends/friends.service";
import {EventService} from "../../services/event/event.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = false;
  isConnected: boolean = false;
  hasResults: boolean = false;
  eventService: EventService;
  userService: UserService;
  allergenService: AllergenService;
  characteristicService: CharacteristicService;
  listsService: ListsService;
  restaurantService: RestaurantService;
  friendsService: FriendsService;
  RollForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string;
  myLists: List[];
  myFriendLists: Group[];
  result: Restaurant;
  characteristics: Characteristic[];
  allergens: Allergen[];
  types: Type[];

  constructor(userService: UserService, private formBuilder: FormBuilder, private router: Router, listsService: ListsService,
              allergenService: AllergenService, characteristicService: CharacteristicService, restaurantService: RestaurantService,
              friendsService: FriendsService, eventService: EventService) {
    this.userService = userService;
    this.listsService = listsService;
    this.characteristicService = characteristicService;
    this.allergenService = allergenService;
    this.restaurantService = restaurantService;
    this.friendsService = friendsService;
    this.eventService = eventService;
  }

  // convenience getter for easy access to form fields
  get fields() { return this.RollForm.controls; }

  ngOnInit(): void {
    // attention name doit dégager => on remplace par ville
    this.isConnected = this.userService.isLoggedIn;
    this.RollForm = this.formBuilder.group({
      list: ['', []],
      friendList: ['', []],
      // ces filtres ne seront que si on est déconnecté (connecté ca se fera avec les préférences utilisateur)
      characteristics: [[], []],
      allergens: [[], []],
      city: ['', []],
      types: [[], []],
    });
    this.loadFilters();
    if(this.isConnected){
      this.loadUserData()
    }
  }

  loadFilters (){
    this.isLoading = true;
    this.allergenService.getAllergens()
      .subscribe((allergensResponse: Allergen[]) => {
          this.allergens = allergensResponse;
          this.characteristicService.getCharacteristics()
            .subscribe(
              (characteristicsResponse: Characteristic[]) => {
                this.characteristics = characteristicsResponse;
                this.restaurantService.getRestaurantTypes()
                  .subscribe(
                    (types: Type[]) => {
                      this.types = types;

                      this.isLoading = false;
                    },
                    (error: any) => {
                      this.isLoading = false;
                      console.error(error);
                    })
              },
              (error: any) => {
                this.isLoading = false;
                console.error(error);
              })
        },
        (error: any) => {
          this.isLoading = false;
          console.error(error);
        })
  }

  loadUserData(){
    this.isLoading = true;
    this.userService.getUser().subscribe(
      (user: User) => {
        this.userService.storeUser(user);
        this.eventService.userChange.emit(user.firstName);
        if(user && !user.hasCompletedSituation){
          this.router.navigate(['situation']).then(() => this.isLoading = false)
        }else{
          this.listsService.getLists().subscribe(
            (lists: List[]) => {
              this.myLists = lists;
              this.friendsService.getGroups().subscribe(
                (groups: Group[]) => {
                  this.isLoading = false;
                  this.myFriendLists = groups;
                },
                (error: any) => {
                  this.isLoading = false;
                  console.error(error);
                })
            },
            (error: any) => {
              this.isLoading = false;
              console.error(error);
            })
        }
      },
      (error: any) => {
        this.isLoading = false;
        console.error(error);
      })
  }

  onRollForm(){
    const filters = this.RollForm.value;
    this.submitted = true;
    // TODO bonus si roll again => enlever du poids ?
    filters.characteristics = this.characteristics.filter(c => c.selected).map(ch => ch.id);
    filters.types = this.types.filter(t => t.selected).map(ty => ty.id);
    filters.allergens = this.allergens.filter(a => a.selected).map(all => all.id);
    this.restaurantService.roll(filters).subscribe(
      (restaurants: {restaurant: Restaurant, score: number}) => {
        this.hasResults = true;
        this.result = restaurants ? restaurants.restaurant : null;
        this.isLoading = false;
        this.errorMessage = null;
      },
      (error: any) => {
        this.isLoading = false;
        this.hasResults = false;
        this.result = null;
        this.errorMessage = error.error && error.error.message ? error.error.message : "Une erreur est survenue";
        console.error(error);
      }
    )
  }

  choose(){
    const filters = this.RollForm.value;
    const list = filters.friendList

    this.restaurantService.choose(list, this.result.id).subscribe(
      (ret) => {
        this.router.navigate(['restaurant/' + this.result.id + "/validation" +
        ("/" + (list ? list : "-1"))])
      },
      (error: any) => {
        this.errorMessage = error.error && error.error.message ? error.error.message : "Une erreur est survenue";
        console.error(error);
      }
    )
  }

  navigate(link: string){
    this.router.navigate([link])
  }

}
