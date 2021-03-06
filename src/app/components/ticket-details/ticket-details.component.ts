import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Ticket} from "../../data/ticket";
import {SupportService} from "../../services/support/support.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupportComment} from "../../data/supportComment";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  @ViewChild('scroll') private myScrollContainer: ElementRef;

  ticket: Ticket;
  supportService: SupportService;
  CommentForm: FormGroup;
  isLoading: boolean = false;
  submitted: boolean = false;
  message: string;
  idTicket: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, supportService: SupportService) {
    this.supportService = supportService;
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngOnInit(): void {
    this.CommentForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.idTicket = this.route.snapshot.paramMap.get('idTicket');
    this.isLoading = true;
    this.supportService.getTicket(this.idTicket).subscribe(
      (data) => {
        this.isLoading = false;
        this.ticket = data;
        this.scrollToBottom();
      },
      (error: any) => {
        this.isLoading = false;
        this.message = error.error.message ? error.error.message : "Une erreur est survenue";
        console.error(error);
      })
  }

  comment(): void {
    if(this.CommentForm.valid){
      this.submitted = true;
      const request: SupportComment = {
        idTicket : this.idTicket,
        message : this.CommentForm.value.message
      };
      this.supportService.sendSupportComment(request).subscribe(
        (data) => {
          this.ticket = data;
          this.CommentForm.reset()
        },
        (error: any) => {
          console.error(error);
          this.message = error.error.message ? error.error.message : "Une erreur est survenue";
        });
    }
  }

}
