import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  SupportForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.SupportForm = this.formBuilder.group({
      object: [undefined, [Validators.required]],
      type: [undefined, [Validators.required]],
      description: [undefined, [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get fields() { return this.SupportForm.controls; }

  onFormSubmit(){
    this.submitted = true;
    if(this.SupportForm.valid){
      const supportRequest = this.SupportForm.value;
      // todo call
    }
  }

}
