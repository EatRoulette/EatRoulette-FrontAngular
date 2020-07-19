import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Restaurant } from "../../data/restaurant";
import { isPresent } from "../../utils/utils";
import {SearchService} from "../../services/search/search.service";
import {Router} from "@angular/router";
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  SearchForm: FormGroup;
  restaurants: Restaurant[];
  errorMessage: string;
  submitted: boolean = false;
  hasResults: boolean = false;
  isConnected: boolean = false;
  userService: UserService;
  searchService: SearchService;
  p: number = 1; // page for pagination

  constructor(private router: Router, private formBuilder: FormBuilder, searchService: SearchService, userService: UserService) {
    this.searchService = searchService;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.SearchForm = this.formBuilder.group({
      name: ['', []],
      city: ['', []],
      postalCode: ['', []],
    });
    this.isConnected = this.userService.isLoggedIn;
  }

  onFormSubmit(){
    this.hasResults = false;
    this.submitted = true;
    this.errorMessage = undefined;
    const searchValues = this.SearchForm.value;
    if(isPresent(searchValues.name) || isPresent(searchValues.city) ||  isPresent(searchValues.postalCode)){
      this.searchService.search(searchValues).subscribe(
        (response: any) => {
          this.hasResults = true;
          this.restaurants = response;
        },
        (error: any) => {
          console.error(error);
          this.errorMessage = error.error.message ? error.error.message : "Une erreur est survenue";
        });
    }else{
      this.errorMessage = "Veuillez saisir au moins un critère de recherche"
    }
  }

  gotToAdd(){
    this.router.navigate(['restaurant/add', this.SearchForm.value])
  }

}
