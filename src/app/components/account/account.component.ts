import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../data/user";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userService: UserService;
  UpdateUserForm: FormGroup;
  user: User;
  isModifying: boolean = false;
  isLoading: boolean = false;
  submitted: boolean = false;

  // todo mettre une background image

  constructor(private formBuilder: FormBuilder, private router: Router,userService: UserService) {
    this.userService = userService;
  }

  async ngOnInit(): Promise<void> {
    await this.userService.getUser().subscribe( (userResponse: User) => {
      this.user = userResponse;
      this.UpdateUserForm = this.formBuilder.group({
        lastName: [this.user.lastName, [Validators.required]], // [initialValue, [validators]]
        firstName: [this.user.firstName, [Validators.required]],
        email: [this.user.email, [Validators.required, Validators.email]],
        address: [this.user.address, [Validators.required]],
        town: [this.user.town, [Validators.required]],
        postalCode: [this.user.postalCode, [Validators.required, Validators.pattern(new RegExp('^([0-9]{5})$'))]],
        phone: [this.user.phone, [Validators.required, Validators.pattern(new RegExp('^([0-9]{10})$'))]],
      });
    });
  }

  modify(){
    this.isModifying = true;
  }

  onFormSubmit() {
    this.submitted = true;
    if(this.UpdateUserForm.valid){
      const user = this.UpdateUserForm.value;
      this.updateData(user);
    }
  }

  // convenience getter for easy access to form fields
  get fields() { return this.UpdateUserForm.controls; }

  updateData(user: User){
    this.isLoading = true;
    this.userService.updateUser(user).subscribe(
      (userUpdated: User) => {
        this.isLoading = false;
        this.user = userUpdated;
        this.isModifying = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.error(error);
      })
  }
}
