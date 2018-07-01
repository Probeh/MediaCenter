import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule }      from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule }           from '@angular/core';
import { RouterModule }       from '@angular/router';
import { HttpModule }         from '@angular/http';
import { MoviesModule }       from './Components/Movies/Movies.module';
import { ShoppingCartModule } from './Components/ShoppingCart/ShoppingCart.module';

import { AppComponent }          from './app.component';
import { MovieService }          from './Components/Movies/Services/Movie.service';
import { DataService }           from './Services/Data.service';
import { AuthService }           from './Components/Account/Services/Auth.service';
import { AuthGuardService }      from './Services/AuthGuard.service';
import { HomeComponent }         from './Components/Home/Home.component';
import { MoviesComponent }       from './Components/Movies/Movies.component';
import { HeaderComponent }       from './Components/Header/Header.component';
import { ShopService }           from './Components/ShoppingCart/Services/Shop.service';
import { ShoppingCartComponent } from './Components/ShoppingCart/ShoppingCart.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MoviesModule,
    ShoppingCartModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      { path: "",             component: MoviesComponent },
      { path: "Home",         component: HomeComponent },
      { path: "Movies",       component: MoviesComponent },
      { path: "ShoppingCart", component: ShoppingCartComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  providers: [AuthService, AuthGuardService, DataService, MovieService, ShopService],
  bootstrap: [AppComponent]
})

export class AppModule { }