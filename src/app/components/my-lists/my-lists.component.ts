import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {List} from "../../data/list";
import {Restaurant} from "../../data/restaurant";
import {ListsService} from "../../services/lists/lists.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { isPresent } from "../../utils/utils";

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.css']
})
export class MyListsComponent implements OnInit {
  lists: List[];
  list: List = undefined;
  listsService: ListsService;
  isLoading: boolean = false;
  isSearching: boolean = false;
  hasResults: boolean = false;
  SearchForm: FormGroup;
  AddListForm: FormGroup;
  results: Restaurant[];
  submitted: boolean = false;
  errorMessage: string;
  addListSubmitted: boolean = false;
  addListErrorMessage: string;

  constructor(listsService: ListsService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.listsService = listsService;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.SearchForm = this.formBuilder.group({
      name: ['', []],
      city: ['', []],
      postalCode: ['', []],
    });
    this.AddListForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    this.refresh();
  }

  refresh(){
    this.listsService.getLists().subscribe(
      (lists: List[]) => {
        this.isLoading = false;
        this.lists = lists;
      },
      (error: any) => {
        this.isLoading = false;
        console.error(error);
      })
  }

  selectValue(event){
    this.list = this.lists.find(l => l.id === event.target.value)
  }

  reset(lists: List[]){
    this.lists = lists;
    this.list = this.lists.find(l => l.id === this.list.id)
    this.isSearching = false;
    this.results = undefined;
    this.submitted = false;
    this.hasResults = false;
    this.errorMessage = undefined;
  }

  delete(id: string){
    this.listsService.deleteRestaurant(id, this.list.id).subscribe(
      (lists: any) => {
        this.reset(lists)
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = error.error.message ? error.error.message : "Une erreur est survenue";
      });
  }

  openModalAddNewList(content){
    this.modalService.open(content)
  }

  toggleSearch(){
    this.isSearching = !this.isSearching;
    this.errorMessage = undefined;
    this.results = undefined;
    this.submitted = false;
  }

  addNewRestaurant(idRestaurant: string){
    this.listsService.addNewRestaurant(idRestaurant, this.list.id).subscribe(
      (lists: any) => {
        this.reset(lists)
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = error.error.message ? error.error.message : "Une erreur est survenue";
      });
  }

  existsIntoList(idRestaurant){
    return this.list.restaurants.find(restaurant => restaurant.id === idRestaurant)
  }

  deleteList(){
    this.listsService.deleteList(this.list.id).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = error.error && error.error.message ? error.error.message : "Une erreur est survenue";
      });
  }

  onSearchFormSubmit(){
    const searchValues = this.SearchForm.value;
    this.submitted = true;
    if(isPresent(searchValues.name) || isPresent(searchValues.city) || isPresent(searchValues.postalCode)){
      this.listsService.search(searchValues).subscribe(
        (response: any) => {
          this.errorMessage = undefined;
          this.results = response;
          this.hasResults = true;
        },
        (error: any) => {
          console.error(error);
          this.errorMessage = error.error && error.error.message ? error.error.message : "Une erreur est survenue";
        });
    }else{
      this.errorMessage = "Veuillez saisir au moins un critère de recherche"
    }
  }

  onAddListFormSubmit(){
    const {name} = this.AddListForm.value;
    this.addListSubmitted = true;
    if(this.AddListForm.valid){
      this.listsService.addList(name).subscribe(
        (response: any) => {
          this.addListErrorMessage = undefined;
          this.modalService.dismissAll();
          this.refresh();
        },
        (error: any) => {
          console.error(error);
          this.addListErrorMessage = error.error && error.error.message ? error.error.message : "Une erreur est survenue";
        });
    }else{
      this.addListErrorMessage = "Veuillez saisir un nom pour le nouveau groupe"
    }
  }

}
