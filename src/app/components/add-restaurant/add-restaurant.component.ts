import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Allergen} from "../../data/allergen";
import {Characteristic} from "../../data/characteristic";
import {AllergenService} from "../../services/allergen/allergen.service";
import {CharacteristicService} from "../../services/characteristic/characteristic.service";
import {Situation} from "../../data/situation";

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  AddForm: FormGroup;
  allergens: Allergen[] = []; //starting with empty array
  characteristics: Characteristic[] = [];
  allergenService: AllergenService;
  characteristicService: CharacteristicService;
  isLoading: boolean = false; // todo manage

  constructor(private formBuilder: FormBuilder, allergenService: AllergenService, characteristicService: CharacteristicService) {
    this.allergenService = allergenService;
    this.characteristicService = characteristicService;
  }

  ngOnInit(): void {
    this.AddForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      allergens: ['', []],
      characteristics: ['', []],
    });
    this.loadAllergensAndCharacteristics();
  }

  loadAllergensAndCharacteristics(){
    this.isLoading = true;
    this.allergenService.getAllergens()
      .subscribe((allergensResponse: Allergen[]) => {
          this.allergens = allergensResponse;
          this.characteristicService.getCharacteristics()
            .subscribe(
              (characteristicsResponse: Characteristic[]) => {
                this.characteristics = characteristicsResponse;
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
  }

  onFormSubmit(){

  }

}
