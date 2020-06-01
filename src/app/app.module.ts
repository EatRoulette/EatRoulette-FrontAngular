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
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StorageServiceModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
