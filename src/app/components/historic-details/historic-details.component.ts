import { Component, OnInit } from '@angular/core';
import {HistoricService} from '../../services/historic/historic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoricDetails} from '../../data/historicDetails';
import * as moment from 'moment';

@Component({
  selector: 'app-historic-details',
  templateUrl: './historic-details.component.html',
  styleUrls: ['./historic-details.component.css']
})
export class HistoricDetailsComponent implements OnInit {
  historicService: HistoricService;
  isLoading: boolean = false;
  idRestaurant: string;
  historics: HistoricDetails;
  p: number = 1; // page for pagination
  constructor(private router: ActivatedRoute, historicService: HistoricService) {
    this.historicService = historicService;
  }

  ngOnInit(): void {
    this.idRestaurant = this.router.snapshot.paramMap.get('idRestaurant');
    this.isLoading = true;
    this.historicService.getHistoryOneRestaurantWithUser(this.idRestaurant).subscribe((historicDetailsResponse: HistoricDetails) => {
      console.log(historicDetailsResponse);
      this.historics = historicDetailsResponse;
      for (const historicsKey of this.historics.allStats) {
        historicsKey.date_historical = moment(historicsKey.date_historical).format('MM/DD/YYYY');
      }
      this.isLoading = false;
    });
  }

}
