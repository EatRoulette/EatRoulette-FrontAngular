import { Component, OnInit } from '@angular/core';
import {Allergen} from "../../data/allergen";
import {Situation} from "../../data/situation";
import {AllergenService} from "../../services/allergen/allergen.service";

@Component({
  selector: 'app-situation',
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.css']
})
export class SituationComponent implements OnInit {
  allergens: Allergen[] = []; //starting with empty array
  situation: Situation;
  allergenService: AllergenService;

  constructor(allergenService: AllergenService) {
    this.allergenService = allergenService;
  }

  ngOnInit(): void {
    // todo add pizza loader
    this.allergenService.getAllergens()
      .subscribe((response: any) => {
          this.allergens = response;
          // todo load situation data and match it to set selected
      },
      (error: any) => {
        console.error(error);
        // todo display error?
      })
  }

  // todo manage radio click

}
