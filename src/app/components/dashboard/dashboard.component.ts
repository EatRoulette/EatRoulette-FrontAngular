import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../data/user";
import {Router} from "@angular/router";
import {List} from "../../data/list";
import {ListsService} from "../../services/lists/lists.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = false;
  isConnected: boolean = false;
  userService: UserService;
  RollForm: FormGroup;
  listsService: ListsService;
  showFilters: boolean = false;
  hasResults: boolean = false;
  submitted: boolean = false;
  errorMessage: string
  myLists: List[]

  constructor(userService: UserService, private formBuilder: FormBuilder, private router: Router, listsService: ListsService) {
    this.userService = userService;
    this.listsService = listsService;
  }

  ngOnInit(): void {
    this.isConnected = this.userService.isLoggedIn;
    this.RollForm = this.formBuilder.group({
      name: ['', []],
      list: ['', []],
      filters: [[], []],
    });
    if(this.isConnected){
      this.loadUserData()
    }
  }

  loadUserData(){
    this.isLoading = true;
    this.userService.getUser().subscribe(
      (user: User) => {
        this.userService.storeUser(user)
        if(user && !user.hasCompletedSituation){
          this.router.navigate(['situation']).then(() => this.isLoading = false)
        }else{
          this.listsService.getLists().subscribe(
            (lists: List[]) => {
              this.isLoading = false;
              this.myLists = lists;
            },
            (error: any) => {
              this.isLoading = false;
              console.error(error);
            })
        }
      },
      (error: any) => {
        this.isLoading = false;
        console.error(error);
      })
  }

  onRollForm(){
    //TODO
  }

  toggleFilters(){
    this.showFilters = !this.showFilters;
  }

  navigate(link: string){
    // TODO
  }

}
