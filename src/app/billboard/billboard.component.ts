import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieProperties } from '../movie-properties.interface';
import { genericResponse } from '../genericResponse.interface';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.css'
})
export class BillboardComponent implements OnInit {

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.movies = this.getMovies();
  }

  movies: any;
  // movies: genericResponse;

  readonly movieApiURL = 'https://localhost:7046/api/Movies';

  getMovies()
  {
    return this.httpClient.get(this.movieApiURL);
  }

}
