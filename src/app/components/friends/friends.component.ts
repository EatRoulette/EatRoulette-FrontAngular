import { Component, OnInit } from '@angular/core';
import {Group} from "../../data/group";
import {FriendsService} from "../../services/friends/friends.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import { isPresent } from "../../utils/utils";
import {Friend} from "../../data/Friend";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  groups: Group[];
  group: Group = undefined;
  friendsService: FriendsService;
  isLoading: boolean = false;
  isSearching: boolean = false;
  submitted: boolean = false;
  SearchForm: FormGroup;
  results: Friend[];
  errorMessage: string;

  constructor(friendsService: FriendsService, private formBuilder: FormBuilder) {
    this.friendsService = friendsService;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.SearchForm = this.formBuilder.group({
      firstName: ['', []],
      lastName: ['', []],
    });
    this.friendsService.getGroups().subscribe(
      (groups: Group[]) => {
        this.isLoading = false;
        this.groups = groups;
      },
      (error: any) => {
        this.isLoading = false;
        console.error(error);
      })
  }

  selectValue(event){
    this.group = this.groups.find(g => g.id === event.target.value)
  }

  delete(id: string){
    //todo delete => call api
  }

  addNewGroup(){
    // todo add => go to new group form
  }

  toggleSearch(){
    this.isSearching = !this.isSearching;
    this.errorMessage = undefined;
    this.results = undefined;
    this.submitted = false;
  }

  addNewFriend(idFriend: string){
    this.friendsService.addNewFriend(idFriend, this.group.id).subscribe(
      (response: any) => {
        this.toggleSearch();
        this.results = undefined;
        this.submitted = false;
        this.errorMessage = undefined;
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = error.error.message ? error.error.message : "Une erreur est survenue";
      });
  }

  onFormSubmit(){
    const searchValues = this.SearchForm.value;
    this.submitted = true;
    if(isPresent(searchValues.firstName) || isPresent(searchValues.lastName)){
      this.friendsService.search(searchValues).subscribe(
        (response: any) => {
          this.errorMessage = undefined;
          this.results = response;
        },
        (error: any) => {
          console.error(error);
          this.errorMessage = error.error && error.error.message ? error.error.message : "Une erreur est survenue";
        });
    }else{
      this.errorMessage = "Veuillez saisir au moins un critère de recherche"
    }
  }

}
