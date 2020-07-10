import {Characteristic} from './characteristic';
import {Allergen} from './allergen';

export class Restaurant {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  postalCode: string;
  characteristics: Characteristic[];
  allergens: Allergen[];
  website: string;

  constructor(id: string, name: string,
              type: string, address: string,
              city: string, postalCode: string,
              characteristics: Characteristic[], allergens: Allergen[], website: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.characteristics = characteristics;
    this.allergens = allergens;
    this.website = website;
  }


}
