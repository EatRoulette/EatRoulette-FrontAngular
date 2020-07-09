import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SituationComponent} from './components/situation/situation.component';
import {AuthGuard} from './auth/auth.guard';
import {SupportComponent} from './components/support/support.component';
import {TicketsComponent} from './components/tickets/tickets.component';
import {TicketDetailsComponent} from './components/ticket-details/ticket-details.component';
import {SearchComponent} from './components/search/search.component';
import {AddRestaurantComponent} from './components/add-restaurant/add-restaurant.component';
import {FriendsComponent} from './components/friends/friends.component';
import {MyListsComponent} from './components/my-lists/my-lists.component';
import {RestaurantDetailComponent} from './components/restaurant-detail/restaurant-detail.component';

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
    path: 'search',
    component: SearchComponent,
    data: {
      title: 'Page de recherche'
    }
  },
  {
    path: 'restaurant/add',
    component: AddRestaurantComponent,
    data: {
      title: 'Page d\'ajout de restaurant'
    }
  },
  {
    path: 'restaurant/:idRestaurant',
    component: RestaurantDetailComponent,
    data: {
      title: 'Restaurant'
    }
  },
  {
    path: 'tickets',
    component: TicketsComponent,
    data: {
      title: 'Page Liste des Demande de support'
    },
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'friends',
    component: FriendsComponent,
    data: {
      title: 'Page Liste des amis et groupes'
    },
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'myLists',
    component: MyListsComponent,
    data: {
      title: 'Page de mes listes de restaurant'
    },
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'tickets/:idTicket',
    component: TicketDetailsComponent,
    data: {
      title: 'Page Detail d\'une Demande de support'
    },
    canActivate: [
      AuthGuard
    ]
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
