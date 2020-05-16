import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Login} from "./login";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserForm: FormGroup;
  message: string;
  userService: UserService;

  constructor(formBuilder: FormBuilder, userService: UserService, private router: Router) {
    this.UserForm = formBuilder.group({
      email: ['', [Validators.required]], // TODO regex email
      password: ['', [Validators.required]],
    });
    this.userService = userService;
  }


  onFormSubmit() {
    const user = this.UserForm.value;
    this.Login(user);
  }

  Login(login: Login) {
    this.userService.Login(login).subscribe(
      (value: Login[]) => {
        // TODO save token received
        this.message = null;
        this.UserForm.reset();
        this.router.navigate(['/'])
      },
      (error: any) => {
        console.error(error);
        this.message = 'Une erreur est survenue';
      });
  }

  ngOnInit(): void {
  }

}
