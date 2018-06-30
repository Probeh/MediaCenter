import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MovieService } from '../../Services/Movie.service';
import { Movie } from '../../Models/Movie.model';
import { Genre, Genres } from '../../Models/Genre.model';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-MovieList',
  templateUrl: './MovieList.component.html',
  styleUrls: ['./MovieList.component.scss']
})
export class MovieListComponent implements OnInit {
  // Properties
  @ViewChild('movieModal') public movieModal: ModalDirective;
  @Output() public selection: Movie = new Movie();
  public showSelection = new EventEmitter<Movie>();
  // Public Collections
  public movieList: Movie[] = new Array<Movie>();
  public genreList: Genre[] = new Array<Genre>();

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    // Subscribing To Service Emitters =>
    this.movieService.movieList.subscribe(
      (value: Movie[]) => this.movieList = value);
    this.movieService.genreList.subscribe(
      (value: Genre[]) => this.genreList = value);

    // Initializing Local Collections =>
    this.movieList = this.movieService.getMovieList();
    this.genreList = this.movieService.getGenreList();

    // Subscribing To Local DOM Emitters =>
    this.showSelection.subscribe((entry: Movie) => this.displayChild(entry));
  }

  public getMovieCount(request?: string): number | void {
    if (request == null) {
      return this.movieService.getMovieList().length;
    }
    else {
      return this.movieService.getMovieList().filter(item => item.genres.includes(request)).length;
    }
  }
  public filterMovies(filter?: string) {
    if (filter == null) {
      this.movieList = this.movieService.getMovieList();
    }
    else {
      this.movieList = this.movieService.getMovieList().filter(item => item.genres.includes(filter));
    }
  }
  private displayChild(entry: Movie) {
    // Updating The Local @Output Property To The User's Current Entry Selection
    this.selection = entry;
    this.movieService.getUpdates(this.selection).then(update => console.log(update));
    // Loading The Details Modal Displaying The Current Entry Selection As an @Input Property
    this.movieModal.show();
  }
}
