import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  SearchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.SearchForm = this.formBuilder.group({
      name: ['', []],
      city: ['', []],
      postalCode: ['', []],
    }); // Todo validator => at least one field filled
  }

  onFormSubmit(){
    // todo
  }

}
