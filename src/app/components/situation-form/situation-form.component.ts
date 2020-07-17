import {Component, Input, OnInit} from '@angular/core';
import {Characteristic} from "../../data/characteristic";
import {Allergen} from "../../data/allergen";
import {Type} from "../../data/type";

@Component({
  selector: 'app-situation-form',
  templateUrl: './situation-form.component.html',
  styleUrls: ['./situation-form.component.css']
})
export class SituationFormComponent implements OnInit {
  @Input()
  characteristics: Characteristic[];
  @Input()
  allergens: Allergen[];
  @Input()
  types: Type[];

  constructor() { }

  ngOnInit(): void {
  }

  onTypeChange(idType: string){
    this.types.forEach(type => {
      if(type.id === idType){
        type.selected = !type.selected;
      }
    })
  }

  onAllergenChange(idAllergen: string){
    this.allergens.forEach(allergen => {
      if(allergen.id === idAllergen){
        allergen.selected = !allergen.selected;
      }
    })
  }

  onRadioChange(idCharacteristic: string, newValue: boolean){
    this.characteristics.forEach(characteristic => {
      if(characteristic.id === idCharacteristic){
        characteristic.selected = newValue;
      }
    })
  }
}
