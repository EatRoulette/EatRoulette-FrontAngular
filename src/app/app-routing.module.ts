import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "./components/login/login.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SituationComponent} from "./components/situation/situation.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Page Inscription'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Page Connexion'
    }
  },
  {
    path: 'situation',
    component: SituationComponent,
    data: {
      title: 'Page Situation'
    }
  },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}];

// todo conditionner l'arrivée sur certaines pages en fonction du statut de connexion

@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule,
    ReactiveFormsModule],
  exports: [RouterModule, FormsModule,
    ReactiveFormsModule]
})
export class AppRoutingModule {
}
