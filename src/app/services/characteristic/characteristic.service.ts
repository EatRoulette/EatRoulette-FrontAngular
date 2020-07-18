import { Injectable } from '@angular/core';
import {Service} from "../service";

@Injectable({
  providedIn: 'root'
})

export class CharacteristicService {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }
  getCharacteristics() {
    return this.service.get('/characteristics/')
  }
}
