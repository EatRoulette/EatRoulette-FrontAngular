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
  result: HistoricRestaurant[];
  errorMessage: string;
  hasResults: boolean = false;
  isLoading: boolean = false;
  p: number = 1; // page for pagination

  constructor(private router:Router, historicService: HistoricService) {
    this.historicService = historicService;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.historicService.getHistoryUser().subscribe((response) => {
      console.log(response)
      this.result = response.allStats;
      this.isLoading = false;
      this.hasResults = true;
      this.errorMessage = null;
    }, (error: any) => {
      console.error(error);
      this.hasResults = false;
      this.errorMessage = error.error.message ? error.error.message : "Une erreur est survenue";
    });
  }

  see(restaurantId){
    this.router.navigate(['restaurant/' + restaurantId + "/historic/-1" ]);
  }
  showDetails(restaurantId){
    this.router.navigate(['historic/' + restaurantId]);
  }
}
