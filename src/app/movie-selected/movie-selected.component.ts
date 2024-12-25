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

  movieSelected: MovieProperties = {title:""};

  movieSelectedPosterPathFromTMDBApi: string = "";

  imgSrcForPosterFromTMDB: string = "https://image.tmdb.org/t/p/original";

  ngOnInit(): void{

    this.getMovie(2).subscribe(resp =>{
      var respJsonString = JSON.stringify(resp);
      var respJson = JSON.parse(respJsonString);
      var data = respJson.data;
      this.movieSelected.title = data.title;
      this.movieSelected.runtime = data.runtime;
      this.movieSelected.genre = data.genre;
    });


    this.getTMDBFindData().subscribe(resp =>{
      // console.log(resp);
      var respJsonString = JSON.stringify(resp);
      var respJson = JSON.parse(respJsonString);

      var movieResults = respJson.movie_results[0];
      // console.log("respJson.movie_results:");
      // console.log(respJson.movie_results);
      // console.log("TMDB movie id:");
      // console.log(respJson.movie_results[0].id);
      // console.log("poster path:");
      // console.log(respJson.movie_results[0].poster_path);
      var posterPath = movieResults.poster_path;
      this.movieSelectedPosterPathFromTMDBApi = posterPath;
      console.log("movieSelectedPosterPathFromTMDBApi:");
      console.log(this.movieSelectedPosterPathFromTMDBApi);
      this.imgSrcForPosterFromTMDB = this.imgSrcForPosterFromTMDB + this.movieSelectedPosterPathFromTMDBApi;
      console.log("new value:");
      console.log(this.imgSrcForPosterFromTMDB);
    });

  }

  readonly movieApiUrl = 'https://localhost:7046/api/Movies';

  readonly TMDBFindUrl = 'https://api.themoviedb.org/3/find/tt0096895?external_source=imdb_id&api_key=b044b7f581ea2e1e91131d95a553ec1f';
  // readonly TMDBFindUrl = 'https://api.themoviedb.org/3/find/tt0096895?external_source=imdb_id';
  // readonly TMDBFindUrl = 'https://api.themoviedb.org/3/find/tt0096895';

  getMovie(id: number)
  {
    return this.httpClient.get(this.movieApiUrl + "/" + id);
  }

  getTMDBFindData()
  {
    return this.httpClient.get(this.TMDBFindUrl);
  }


}
