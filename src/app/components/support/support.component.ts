import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupportService} from "../../services/support/support.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  SupportForm: FormGroup;
  message: string;
  successMessage: string;
  submitted: boolean = false;
  supportService: SupportService;

  constructor(private router: Router, private formBuilder: FormBuilder, supportService: SupportService) {
    this.supportService = supportService;
  }

  ngOnInit(): void {
    this.SupportForm = this.formBuilder.group({
      object: ['', [Validators.required]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get fields() { return this.SupportForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    if(this.SupportForm.valid){
      const supportRequest = this.SupportForm.value;
      this.supportService.sendSupportRequest(supportRequest).subscribe(
        (response: any) => {
          this.successMessage = "La demande de support a bien été envoyée";
        },
        (error: any) => {
          console.error(error);
          this.message = error.error.message ? error.error.message : "Une erreur est survenue";
        });
    }
  }

  navigate(link){
    this.router.navigate([link])
  }
}
