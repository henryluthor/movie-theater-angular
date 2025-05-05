import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieProperties } from '../movie-properties.interface';
import { MySharedService } from '../shared/my-shared.service';
import * as companyData from '../../assets/companyData.json'

@Component({
  selector: 'app-movie-selected',
  templateUrl: './movie-selected.component.html',
  styleUrl: './movie-selected.component.css',
})
export class MovieSelectedComponent implements OnInit {
  @Input() id!: number;

  constructor(private httpClient: HttpClient, private mySharedService: MySharedService) {}

  movieSelected: MovieProperties = { title: '' };
  movieApiResponseMessage: string = "";

  // imgSrcForPosterFromTMDB: string = 'https://image.tmdb.org/t/p/original';
  imgSrcForPosterFromTMDB: string = companyData.imgSrcForPosterFromTMDB

  showSpinner: boolean = false;
  fetchResponse: string = "";

  ngOnInit(): void {
    console.log("entro al onInit");

    this.showSpinner = true;

    this.fetchMovie(this.id).then(resp => {
      this.fetchResponse = resp;
      this.showSpinner = false;
    });

    this.getMovie(this.id).subscribe((resp) => {
      console.log("id");
      console.log(this.id);
      console.log("resp");
      console.log(resp);
      var respJsonString = JSON.stringify(resp);
      var respJson = JSON.parse(respJsonString);
      var data = respJson.data;

      if(data != null)
      {
        //set movieSelected properties
        this.movieSelected.id = data.id;
        this.movieSelected.title = data.title;
        this.movieSelected.runtime = data.runtime;
        this.movieSelected.genre = data.genre;
        this.movieSelected.imdbId = data.imdbId;

        if (this.movieSelected.imdbId != null)
        {
          //look for poster
          this.mySharedService.getTMDBFindData(this.movieSelected.imdbId).subscribe((resp) => {
            var respJsonString = JSON.stringify(resp);
            var respJson = JSON.parse(respJsonString);

            if (respJson.movie_results.length > 0)
            {
              //set image source for selected movie poster
              var movieResults = respJson.movie_results[0];
              var posterPath = movieResults.poster_path;
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
    // return this.httpClient.get(this.movieApiUrl + '/' + id);
    return this.httpClient.get(companyData.API_URL + '/' + id);
  }

  // deprecated
  // getTMDBFindData(imdbid: string) {
  //   return this.httpClient.get(
  //     'https://api.themoviedb.org/3/find/' +
  //       imdbid +
  //       '?external_source=imdb_id&api_key=b044b7f581ea2e1e91131d95a553ec1f'
  //   );
  // }

  async fetchMovie(id: number): Promise<string>
  {
    // This function makes fetch to the API, if successful returns empty string, if failed returns error message.
    var response = "";
    try
    {
      console.log("busca esto");
      console.log(companyData.API_URL + id);
      var responseFromFetch = await fetch(companyData.API_URL + id);
      if(responseFromFetch.ok)
      {
        //do nothing
      }
    }
    catch(error: any)
    {
      response = "An error has occurred. No response from API. " + error.message;
    }

    return response;
  }
}
