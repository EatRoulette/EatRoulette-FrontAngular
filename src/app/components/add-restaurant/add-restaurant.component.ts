import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Allergen} from "../../data/allergen";
import {Characteristic} from "../../data/characteristic";
import {AllergenService} from "../../services/allergen/allergen.service";
import {CharacteristicService} from "../../services/characteristic/characteristic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Restaurant} from "../../data/restaurant";
import {RestaurantService} from "../../services/restaurant/restaurant.service";
import {Type} from "../../data/type";

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  AddForm: FormGroup;
  allergens: Allergen[] = []; //starting with empty array
  characteristics: Characteristic[] = [];
  types: Type[] = [];
  allergenService: AllergenService;
  characteristicService: CharacteristicService;
  restaurantService: RestaurantService;
  isLoading: boolean = false;
  submitted: boolean = false;
  message: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              allergenService: AllergenService,
              restaurantService: RestaurantService,
              characteristicService: CharacteristicService) {
    this.restaurantService = restaurantService;
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
      website: ['', []],
      allergens: [[], []],
      characteristics: [[], []],
      types: [[], []],
    });
    this.loadAllergensAndCharacteristicsAndTypes();
  }

  // convenience getter for easy access to form fields
  get fields() { return this.AddForm.controls; }

  loadAllergensAndCharacteristicsAndTypes(){
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

  onFormSubmit(){
    this.submitted = true;
    if(this.AddForm.valid){
      const request = this.AddForm.value;
      request.characteristics = this.characteristics
      request.allergens = this.allergens
      request.types = this.types
      this.restaurantService.addRestaurant(request).subscribe(
        (response: Restaurant) => {
          this.router.navigate(['search'])
        },
        (error: any) => {
          console.error(error);
          this.message = error.error && error.error.message ? error.error.message : "Une erreur est survenue";
        });
    }
  }

}
