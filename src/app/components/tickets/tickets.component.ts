import { Component, OnInit } from '@angular/core';
import {Ticket} from "../../data/ticket";
import {SupportService} from "../../services/support/support.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  supportService: SupportService;
  isLoading: boolean = false;
  p: number = 1; // page for pagination
  message: string;

  constructor(private router: Router, supportService: SupportService) {
    this.supportService = supportService;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.supportService.getTickets().subscribe(
      (data) => {
        this.isLoading = false;
        this.tickets = data;
        this.message = null;
      },
      (error: any) => {
        this.isLoading = false;
        this.message = error.error.message ? error.error.message : "Une erreur est survenue";
        console.error(error);
      })
  }

  goToDetails(idTicket){
    this.router.navigate(['tickets/' + idTicket])
  }

}
