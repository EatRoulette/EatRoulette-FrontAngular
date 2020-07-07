import { Component, OnInit } from '@angular/core';
import {Allergen} from "../../data/allergen";
import {Situation} from "../../data/situation";
import {AllergenService} from "../../services/allergen/allergen.service";
import {Characteristic} from "../../data/characteristic";
import {CharacteristicService} from "../../services/characteristic/characteristic.service";
import {SituationService} from "../../services/situation/situation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-situation',
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.css']
})
export class SituationComponent implements OnInit {
  allergens: Allergen[] = []; //starting with empty array
  characteristics: Characteristic[] = [];
  situation: Situation;
  allergenService: AllergenService;
  characteristicService: CharacteristicService;
  situationService: SituationService;
  isLoading: boolean = false;

  constructor(private router: Router, allergenService: AllergenService, characteristicService: CharacteristicService, situationService: SituationService) {
    this.allergenService = allergenService;
    this.characteristicService = characteristicService;
    this.situationService = situationService;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.allergenService.getAllergens()
      .subscribe((allergensResponse: Allergen[]) => {
          this.allergens = allergensResponse;
          this.characteristicService.getCharacteristics()
            .subscribe(
              (characteristicsResponse: Characteristic[]) => {
                this.characteristics = characteristicsResponse;
                this.situationService.getSituation().subscribe(
                  (situationResponse: Situation) => {
                    this.situation = situationResponse;
                    this.isLoading = false;
                    this.updateData();
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

  updateData(){
    this.allergens.forEach(allergen => {
      allergen.selected = !!this.situation.allergens.find(id => id === allergen.id);
    });
    this.characteristics.forEach(characteristic => {
      characteristic.selected = !!this.situation.characteristics.find(id => id === characteristic.id);
    });
  }


  sendData(){
    this.isLoading = true;
    const finalSituation = {
      characteristics: this.characteristics,
      allergens: this.allergens
    }
    this.situationService.updateSituation(finalSituation).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate([''])
      },
      (error: any) => {
        this.isLoading = false;
        console.error(error);
      })
  }

  // todo display error?

}
