import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  SupportForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.SupportForm = this.formBuilder.group({
      object: ['', [Validators.required]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onFormSubmit(){
    // TODO
  }

}
