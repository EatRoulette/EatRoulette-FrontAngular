import {Allergen} from "./allergen";

export class User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  town: string;
  postalCode: string;
  phone: string;
  cgu: boolean;
  allergens: string[];
  characteristics: string[];
  hasCompletedSituation: boolean;
}
