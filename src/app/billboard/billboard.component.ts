import { MovieProperties } from './../movie-properties.interface';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MySharedService } from '../shared/my-shared.service';
import * as companyData from '../../assets/companyData.json';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.css'
})
export class BillboardComponent implements OnInit {

  constructor(private httpClient: HttpClient, private mySharedService: MySharedService){}

  //next line to be deprecated
  movies: any;

  moviesNew: MovieProperties[] = [];
  imgSrcForPosterFromTMDB = companyData.imgSrcForPosterFromTMDB;

  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    // this.movies = this.getMovies();

    this.getMovies().subscribe((resp) => {
      var respJsonString = JSON.stringify(resp);
      var respJson = JSON.parse(respJsonString);

      for(let i=0; i < respJson.length; i++)
      {

        var movieCurrent: MovieProperties = {
          id: respJson[i].id,
          title: respJson[i].title,
          year: respJson[i].year,
          runtime: respJson[i].runtime,
          genre: respJson[i].genre,
          imdbId: respJson[i].imdbId
        };

        if(movieCurrent.imdbId != null)
        {
          //look for poster
          this.mySharedService.getTMDBFindData(movieCurrent.imdbId).subscribe((respTMDB) => {
            var respTMDBString = JSON.stringify(respTMDB);
            var respTMDBJson = JSON.parse(respTMDBString);

            if(respTMDBJson.movie_results.length > 0)
            {
              //set image source for movie poster
              var movieResults = respTMDBJson.movie_results[0];
              this.moviesNew[i].posterPath = movieResults.poster_path;
            }
            else
            {
              //set empty string to movieCurrent.imdbId to show message NO POSTER FOUND
              this.moviesNew[i].imdbId = "";
            }
          })
        }

        this.moviesNew.push(movieCurrent);
      }

    })
  }


  //next line to be deprecated
  readonly movieApiURL = 'https://localhost:7046/api/Movies';

  getMovies()
  {
    // return this.httpClient.get(this.movieApiURL);
    return this.httpClient.get(companyData.API_URL);
  }

}
