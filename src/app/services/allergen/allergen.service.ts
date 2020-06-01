import { Injectable } from '@angular/core';
import {Service} from "../service";

@Injectable({
  providedIn: 'root'
})

export class AllergenService {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }
  getAllergens() {
    return this.service.get('/allergens/')
  }
}
