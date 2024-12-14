import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieProperties } from '../movie-properties.interface';

@Component({
  selector: 'app-movie-selected',
  templateUrl: './movie-selected.component.html',
  styleUrl: './movie-selected.component.css'
})
export class MovieSelectedComponent implements OnInit {

  constructor(private httpClient: HttpClient){}

  movieInfo: any;
  movieProperties: MovieProperties = {title:""}

  ngOnInit(): void{
    // this.movieInfo = this.getMovie(1);

    this.getMovie(1).subscribe(resp => {
      var respJsonString = JSON.stringify(resp);
      var respJson = JSON.parse(respJsonString);
      var data = respJson.data;
      this.movieProperties.title = data.title;
    });

  }

  readonly movieApiUrl = 'https://localhost:7046/api/Movies';

  getMovie(id: number)
  {
    return this.httpClient.get(this.movieApiUrl + "/" + id)
  }


}
