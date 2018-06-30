import { CarouselModule, WavesModule, ModalModule, InputsModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './Components/Movie/Movie.component';
import { MovieListComponent } from './Components/MovieList/MovieList.component';
import { MoviesComponent } from './Movies.component';

@NgModule({
  imports: [
    CommonModule,
    CarouselModule,
    WavesModule,
    ModalModule,
    InputsModule,
  ],
  declarations: [
    MoviesComponent,
    MovieComponent,
    MovieListComponent,
  ]
})
export class MoviesModule { }
