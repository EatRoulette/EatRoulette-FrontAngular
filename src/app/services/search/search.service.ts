import { Injectable } from '@angular/core';
import {Service} from "../service";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  service: Service;

  constructor(service: Service) {
    this.service = service;
  }

  search(searchQuery){
    return this.service.post('/restaurant/search/', searchQuery)
  }
}
