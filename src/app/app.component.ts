import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MovieService } from './Components/Movies/Services/Movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private movieService: MovieService) {}

  ngOnInit() {
  }
}
