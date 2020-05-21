import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Login} from "../../data/login";
import {Router} from "@angular/router";
import {EventService} from "../../services/event/event.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  UserForm: FormGroup;
  message: string;
  submitted: boolean = false;
  userService: UserService;
  eventService: EventService;

  constructor(private formBuilder: FormBuilder, userService: UserService, eventService: EventService, private router: Router) {
    this.userService = userService;
    this.eventService = eventService;
  }

  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get fields() { return this.UserForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    if(this.UserForm.valid){
      const user = this.UserForm.value;
      this.Login(user);
    }
  }

  Login(login: Login) {
    this.userService.Login(login).subscribe(
      (response: any) => {
        this.message = null;
        localStorage.setItem('access_token', response.token)
        this.eventService.tokenChange.emit(response.token)
        this.router.navigate(['/']) // todo le header ne s'actualise pas
      },
      (error: any) => {
        console.error(error);
        this.message = error.error.message;
      });
  }

}
