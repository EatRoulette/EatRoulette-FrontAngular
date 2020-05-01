import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Register } from './register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  data = false;
  UserForm: FormGroup;
  message: string;
  userService: UserService;

  constructor(formBuilder: FormBuilder, userService: UserService) {
    this.UserForm = formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      type: ['test'],
    });
   this.userService = userService;
  }
  onFormSubmit() {
    const user = this.UserForm.value;
    this.CreateUser(user);
  }
  CreateUser(register: Register) {
    this.userService.Subscribe(register).subscribe(
      () => {
        this.data = true;
        this.message = null;
        this.UserForm.reset();
      },
      (error: string) => {
        this.data = false;
        this.message = 'Une erreur est survenue';
      });
  }
}
