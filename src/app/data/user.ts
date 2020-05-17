import {Allergen} from "./allergen";

export class User {
  firstName: string;
  lastName: string;
  email:string;
  address: string;
  town: string;
  postalCode: string;
  phone: string;
  allergens : Allergen[];
  vegan: boolean;
  pmr: boolean;
  cgu:boolean;
}
