import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieProperties } from '../movie-properties.interface';

@Component({
  selector: 'app-movie-selected',
  templateUrl: './movie-selected.component.html',
  styleUrl: './movie-selected.component.css',
})
export class MovieSelectedComponent implements OnInit {
  @Input() id!: number;

  constructor(private httpClient: HttpClient) {}

  movieSelected: MovieProperties = { title: '' };

  movieApiResponseMessage: string = "";

  imgSrcForPosterFromTMDB: string = 'https://image.tmdb.org/t/p/original';

  ngOnInit(): void {
    this.getMovie(this.id).subscribe((resp) => {
      var respJsonString = JSON.stringify(resp);
      var respJson = JSON.parse(respJsonString);
      var data = respJson.data;

      if(data != null)
      {
        //set movieSelected properties
        this.movieSelected.title = data.title;
        this.movieSelected.runtime = data.runtime;
        this.movieSelected.genre = data.genre;
        this.movieSelected.imdbId = data.imdbId;

        if (this.movieSelected.imdbId != null)
        {
          //look for poster
          this.getTMDBFindData(this.movieSelected.imdbId).subscribe((resp) => {
            var respJsonString = JSON.stringify(resp);
            var respJson = JSON.parse(respJsonString);

            if (respJson.movie_results.length > 0)
            {
              //set image source por selected movie poster
              var movieResults = respJson.movie_results[0];
              var posterPath = movieResults.poster_path;
              // this.movieSelectedPosterPathFromTMDBApi = posterPath;
              this.imgSrcForPosterFromTMDB += posterPath;
            }
            else
            {
              //set empty string to this.movieSelected.imdbId to show message NO POSTER FOUND
              this.movieSelected.imdbId = "";
            }
          });
        }
      }
      else
      {
        //set movieApiResponseMessage to respJson message to show message in the component
        this.movieApiResponseMessage = respJson.message;
      }

    });
  }

  readonly movieApiUrl = 'https://localhost:7046/api/Movies';

  getMovie(id: number) {
    return this.httpClient.get(this.movieApiUrl + '/' + id);
  }

  getTMDBFindData(imdbid: string) {
    return this.httpClient.get(
      'https://api.themoviedb.org/3/find/' +
        imdbid +
        '?external_source=imdb_id&api_key=b044b7f581ea2e1e91131d95a553ec1f'
    );
  }
}
