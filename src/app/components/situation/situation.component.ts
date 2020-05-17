import { Component, OnInit } from '@angular/core';
import {Allergen} from "../../data/allergen";
import {User} from "../../data/user";

@Component({
  selector: 'app-situation',
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.css']
})
export class SituationComponent implements OnInit {
  allergens: Allergen[] = []; //starting with empty array
  user: User;

  constructor() { }

  ngOnInit(): void {
    // todo getAllergens
    // todo getUser
    // todo faire matcher
    // TODO mock data
    this.allergens = [
      {name:"gluten", id:"1", selected:false},
      {name:"crustacés", id:"2", selected:true},
      {name:"oeuf", id:"3", selected:false},
      {name:"arachides", id:"4", selected:false},
      {name:"poissons", id:"5", selected:false},
      {name:"lait", id:"6", selected:false}
    ]
  }

}
