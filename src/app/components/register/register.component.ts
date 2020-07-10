import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Register } from '../../data/register';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  UserForm: FormGroup;
  message: string;
  submitted: boolean = false;
  userService: UserService; // TODO exemples disagree on camel case or upper camel case

  constructor(private formBuilder: FormBuilder, userService: UserService, private router: Router) {

   this.userService = userService;
  }

  ngOnInit() {
    this.UserForm = this.formBuilder.group({
      firstName: [null, [Validators.required]], // [initialValue, [validators]]
      lastName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, [Validators.required]],
      town: [null, [Validators.required]],
      cgu: [null, [Validators.required]],
      postalCode: [null, [Validators.required, Validators.pattern(new RegExp('^([0-9]{5})$'))]],
      phone: [null, [Validators.required, Validators.pattern(new RegExp('^([0-9]{10})$'))]],
      type: ['user'],
    });
  }

  onFormSubmit() {
    this.submitted = true;
    if(this.UserForm.valid){
      const user = this.UserForm.value;
      this.CreateUser(user);
    }
  }

  // convenience getter for easy access to form fields
  get fields() { return this.UserForm.controls; }

  CreateUser(register: Register) {
    this.userService.Subscribe(register).subscribe(
      (value: Register[]) => {
        this.message = null;
        this.UserForm.reset();
        this.router.navigate(['/login'])
      },
      (error: any) => {
        console.error(error);
        this.message = error.error.message ? error.error.message : "Une erreur est survenue";
      });
  }
}
