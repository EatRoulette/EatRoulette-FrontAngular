import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Allergen} from "../../data/allergen";
import {Characteristic} from "../../data/characteristic";
import {AllergenService} from "../../services/allergen/allergen.service";
import {CharacteristicService} from "../../services/characteristic/characteristic.service";
import {ActivatedRoute} from "@angular/router";

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
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, allergenService: AllergenService, characteristicService: CharacteristicService) {
    this.allergenService = allergenService;
    this.characteristicService = characteristicService;
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    const city = this.route.snapshot.paramMap.get('city');
    const postalCode = this.route.snapshot.paramMap.get('postalCode');
    this.AddForm = this.formBuilder.group({
      name: [name, [Validators.required]],
      city: [city, [Validators.required]],
      address: ['', [Validators.required]],
      postalCode: [postalCode, [Validators.required]],
      allergens: [[], []],
      characteristics: [[], []],
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
