import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Register } from './register';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  UserForm: FormGroup;
  message: string;
  userService: UserService;

  constructor(formBuilder: FormBuilder, userService: UserService, private router: Router) {
    this.UserForm = formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]], // TODO regex email
      email: ['', [Validators.required]],
      type: ['test'], // todo manage right inputs
    });
   this.userService = userService;
  }

  onFormSubmit() {
    const user = this.UserForm.value;
    this.CreateUser(user);
  }

  CreateUser(register: Register) {
    this.userService.Subscribe(register).subscribe(
      (value: Register[]) => {
        this.message = null;
        this.UserForm.reset();
        this.router.navigate(['/login'])
      },
      (error: any) => {
        console.error(error);
        this.message = 'Une erreur est survenue';
      });
  }
}
