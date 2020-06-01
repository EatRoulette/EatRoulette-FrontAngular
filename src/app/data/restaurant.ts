import {Characteristic} from "./characteristic";
import {Allergen} from "./allergen";

export class Restaurant {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  postalCode: string;
  characteristics: Characteristic[];
  allergens : Allergen[];
}
