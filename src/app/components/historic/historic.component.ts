import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HistoricService} from '../../services/historic/historic.service';
import {HistoricRestaurant} from '../../data/historicRestaurant';
@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
  historicService: HistoricService;
  restaurants: HistoricRestaurant;
  isLoading: boolean = false;
  p: number = 1; // page for pagination
  constructor(private router:Router, historicService: HistoricService) {
    this.historicService = historicService;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.historicService.getHistoryUser().subscribe((restaurantResponse: HistoricRestaurant) => {
      this.restaurants = restaurantResponse;
      this.isLoading = false;
    });
  }

  see(restaurantId){
    this.router.navigate(['restaurant/' + restaurantId]);
  }
  showDetails(restaurantId){
    this.router.navigate(['historic/' + restaurantId]);
  }
}
