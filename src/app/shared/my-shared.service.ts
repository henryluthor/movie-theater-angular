import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MySharedService {

  constructor(private httpClient: HttpClient) { }

  getTMDBFindData(imdbid: string) {
    return this.httpClient.get(
      'https://api.themoviedb.org/3/find/' +
        imdbid +
        '?external_source=imdb_id&api_key=b044b7f581ea2e1e91131d95a553ec1f'
    );
  }
}
