import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "./components/login/login.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule, FormsModule,
    ReactiveFormsModule]
})
export class AppRoutingModule {
}
