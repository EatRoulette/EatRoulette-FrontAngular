import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent} from './components/not-found/not-found.component';
import { StorageServiceModule } from "ngx-webstorage-service";
import { SituationComponent } from './components/situation/situation.component';
import { PizzaLoaderComponent } from './components/pizza-loader/pizza-loader.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SupportComponent } from './components/support/support.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { SearchComponent } from './components/search/search.component';
import { RestaurantItemComponent } from './components/search/restaurant-item/restaurant-item.component';
import { AddRestaurantComponent } from './components/add-restaurant/add-restaurant.component';
import { SituationFormComponent } from './components/situation-form/situation-form.component';
import { FriendsComponent } from './components/friends/friends.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyListsComponent } from './components/my-lists/my-lists.component';
import { NgxPaginationModule } from "ngx-pagination";
import { AccountComponent } from './components/account/account.component';
import { RestaurantDetailComponent } from './components/restaurant-detail/restaurant-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    NotFoundComponent,
    SituationComponent,
    PizzaLoaderComponent,
    SidebarComponent,
    SupportComponent,
    TicketsComponent,
    TicketDetailsComponent,
    SearchComponent,
    RestaurantItemComponent,
    AccountComponent,
    AddRestaurantComponent,
    SituationFormComponent,
    FriendsComponent,
    MyListsComponent,
    RestaurantDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
