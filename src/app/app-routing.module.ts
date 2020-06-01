import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "./components/login/login.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SituationComponent} from "./components/situation/situation.component";
import {AuthGuard} from "./auth/auth.guard";
import {SupportComponent} from "./components/support/support.component";
import {TicketsComponent} from "./components/tickets/tickets.component";
import {TicketDetailsComponent} from "./components/ticket-details/ticket-details.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Page Home'
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
    },
    // this means that if a not connected user tries to access this url, he will be redirected to the login page (see app/auth/auth.gard.ts)
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'support',
    component: SupportComponent,
    data: {
      title: 'Page Demande de support'
    },
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    data: {
      title: 'Page Liste des Demande de support'
    }
  },
  {
    path: 'tickets/:idTicket',
    component: TicketDetailsComponent,
    data: {
      title: 'Page Detail d\'une Demande de support'
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
