import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Movie } from '../Models/Movie.model';
import { Genre } from '../Models/Genre.model';

@Injectable()
export class MovieService {
  // Local Variables
  private movies: Movie[] = new Array<Movie>();
  private genres: Genre[] = new Array<Genre>();
  // Public Emitters
  public movieList = new EventEmitter<Movie[]>();
  public genreList = new EventEmitter<Genre[]>();

  constructor(private http: Http) {
    /* Initializing Genre Entries */
    this.getGenres().then(() => this.genreList.emit(this.genres.slice()));
    /* Initializing Movie Entries */
    for (let index = 1; index <= 30; index++) { this.getMovies(index).then(() => this.movieList.emit(this.movies.slice())); }
  }

  private getKey(): string {
    return '7c8354e84c1c7e63a12dcb27ee8c8c37';
  }

  //#region Private Methods For Retrieving Data From API via HttpGet Methods
  private getGenres(): Promise<any> {
    return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.getKey()}&language=en-US`)
      .toPromise()
      .then((result: Response) => {
        var values = result.json().genres;
        values.forEach(element => {
          this.genres.push(new Genre(element.id, element.name));
        });
        return values;
      })
      .catch(error => console.log(error));
  }
  private getMovies(page: number = 1): Promise<any> {
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=7c8354e84c1c7e63a12dcb27ee8c8c37&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .toPromise()
      .then((result: Response) => {
        result.json().results.forEach(element => {
          if (!this.movies.find(item => item.id == element.tmdb)) {
            this.movies.push(new Movie(element.id, element.title, element.original_language, this.getGenre(element.genre_ids), element.vote_count, element.vote_average, element.release_date, element.overview, this.getImageUrl(element.poster_path), [this.getImageUrl(element.backdrop_path)]));
          }
        });
        return result.json();
      })
      .catch(error => console.log(error));
  }
  private getDetails(movieID: number): Promise<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/351286?api_key=7c8354e84c1c7e63a12dcb27ee8c8c37&language=en-US`)
      .toPromise()
      .then((details: Response) => {
        // Retrieving Current Entry For Updating Details
        var update = details.json();
        if (!this.movies[this.movies.findIndex(item => item.id == movieID)]) {
          // Updating Undefined Properties
          this.movies[this.movies.findIndex(item => item.id == movieID)].backdrops.push(this.getImageUrl(update.belongs_to_collection.backdrop_path));
          this.movies[this.movies.findIndex(item => item.id == movieID)].imdb = update.imdb_id;
          this.movies[this.movies.findIndex(item => item.id == movieID)].homepage = update.homepage;
          this.movies[this.movies.findIndex(item => item.id == movieID)].runtime = update.runtime;
          this.movies[this.movies.findIndex(item => item.id == movieID)].revenue = update.revenue;
          this.movies[this.movies.findIndex(item => item.id == movieID)].status = update.status;
        }
        return this.movies[this.movies.findIndex(item => item.id == movieID)];
      })
      .catch(error => console.log(error));
  }
  public getTrailers(movieID: number): Promise<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${this.getKey()}&language=en-US`)
      .toPromise()
      .then((result: Response) => {
        // Updating Trailer Entries
        result.json().results.forEach(element => {
          if (!this.movies[this.movies.findIndex(item => item.id == movieID)].trailers.find(trailer => trailer.title == element.name)) {
            this.movies[this.movies.findIndex(item => item.id == movieID)].trailers.push({ type: element.type, title: element.name, link: this.getVideoUrl(element.key) });
          }
        });
        return this.movies[this.movies.findIndex(item => item.id == movieID)];
      })
      .catch(error => console.log(error))
  }
  private getGenre(keys: number[]): string[] {
    var values: string[] = [];
    keys.forEach(element => {
      values.push(this.genres.find(genre => genre.id == element).name);
    });
    return values;
  }
  private getImageUrl(imagePath: string) {
    return `https://image.tmdb.org/t/p/w500${imagePath}`;
  }
  private getVideoUrl(videoKey: string): string {
    return `https://www.youtube.com/watch?v=${videoKey}`;
  }
  //#endregion

  //#region Public Methods For Retrieving Data From Local Service
  public getMovieList(): Movie[] { return this.movies.slice(); }
  public getGenreList(): Genre[] { return this.genres.slice(); }
  public getUpdates(movie: Movie): Promise<any> {

    return this.getDetails(movie.id)
      .then((movie: Movie) => {
        return this.getTrailers(movie.id)
          .then((movie: Movie) => {
            return movie;
          }).then((movie: Movie) => {
            var updateList: Movie[] = [movie];
            if (localStorage.getItem('Recent')) {
              JSON.parse(localStorage.getItem('Recent')).forEach(element => {
                if (element.id != movie.id) {
                  updateList.push(element);
                  if (updateList.length >= 10) {
                    updateList.splice(10, 1);
                  }
                } 
              });
            }
            localStorage.setItem('Recent', JSON.stringify(updateList));
            return movie;
          });
      });
  }
  //#endregion
}