import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule, FormsModule,
    ReactiveFormsModule]
})
export class AppRoutingModule { }
