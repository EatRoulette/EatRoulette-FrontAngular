import { Component, OnInit } from '@angular/core';
import {Ticket} from "../../data/ticket";
import {SupportService} from "../../services/support/support.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket;
  supportService: SupportService;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, supportService: SupportService) {
    this.supportService = supportService;
  }

  ngOnInit(): void {
    const idTicket = this.route.snapshot.paramMap.get('idTicket');
    this.isLoading = true;
    this.supportService.getTicket(idTicket).subscribe(
      (data) => {
        this.isLoading = false;
        this.ticket = data;
      },
      (error: any) => {
        this.isLoading = false;
        console.error(error);
      })
  }

  // todo display error ?

}
