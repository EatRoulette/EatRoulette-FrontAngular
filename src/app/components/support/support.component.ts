import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SupportService} from "../../services/support/support.service";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  SupportForm: FormGroup;
  message: string;
  submitted: boolean = false;
  supportService: SupportService;

  constructor(private formBuilder: FormBuilder, supportService: SupportService) {
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
          this.message = "La demande de support a bien été envoyée";
          this.SupportForm.reset()
        },
        (error: any) => {
          console.error(error);
          console.log(error.error.message);
          this.message = error.error.message ? error.error.message : "Une erreur est survenue";
        });
    }
  }

}
