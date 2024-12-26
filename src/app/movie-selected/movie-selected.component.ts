import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieProperties } from '../movie-properties.interface';

@Component({
  selector: 'app-movie-selected',
  templateUrl: './movie-selected.component.html',
  styleUrl: './movie-selected.component.css'
})
export class MovieSelectedComponent implements OnInit {

  @Input() id!: number;

  constructor(private httpClient: HttpClient){}

  movieSelected: MovieProperties = {title:""};

  movieSelectedPosterPathFromTMDBApi: string = "";

  imgSrcForPosterFromTMDB: string = "https://image.tmdb.org/t/p/original";

  ngOnInit(): void{

    this.getMovie(this.id).subscribe(resp =>{
      var respJsonString = JSON.stringify(resp);
      var respJson = JSON.parse(respJsonString);
      var data = respJson.data;
      this.movieSelected.title = data.title;
      this.movieSelected.runtime = data.runtime;
      this.movieSelected.genre = data.genre;
      this.movieSelected.imdbId = data.imdbId;

      if(this.movieSelected.imdbId != null)
      {
        this.getTMDBFindData(this.movieSelected.imdbId).subscribe(resp =>{
          var respJsonString = JSON.stringify(resp);
          var respJson = JSON.parse(respJsonString);

          var movieResults = respJson.movie_results[0];
          var posterPath = movieResults.poster_path;
          this.movieSelectedPosterPathFromTMDBApi = posterPath;

          this.imgSrcForPosterFromTMDB += this.movieSelectedPosterPathFromTMDBApi;
        })
      }

    });

  }

  readonly movieApiUrl = 'https://localhost:7046/api/Movies';


  getMovie(id: number)
  {
    return this.httpClient.get(this.movieApiUrl + "/" + id);
  }


  getTMDBFindData(imdbid: string)
  {
    //ver si descompongo la siguiente linea
    return this.httpClient.get('https://api.themoviedb.org/3/find/' + imdbid + '?external_source=imdb_id&api_key=b044b7f581ea2e1e91131d95a553ec1f');
  }


}
