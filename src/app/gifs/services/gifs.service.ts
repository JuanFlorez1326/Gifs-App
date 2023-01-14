import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( 
    private readonly http: HttpClient 
  ) { 
    if ( localStorage.getItem('history') ) {
      this._history = JSON.parse( localStorage.getItem('history')! );
    }

    if( localStorage.getItem('results') ) {
      this.results = JSON.parse( localStorage.getItem('results')! );
    }
  }

  private apiKey   : string = 'fxFFfmGrMf1nffARUk46my9E4vCHDemv';
  private url      : string = 'https://api.giphy.com/v1/gifs';
  private _history : string[] = [];
  public results   : Gif[] = [];

  get history(){
    return [...this._history];
  }

  searchGifs( query: string = '' ){
    query = query.trim().toLowerCase();

    if ( !this._history.includes( query)) {

      this._history.unshift( query );
      this._history = this._history.splice(0, 12);
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '12')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${ this.url }/search`, { params })
      .subscribe(
        (res) => {
          this.results = res.data;
          localStorage.setItem('results', JSON.stringify(this.results));
        }
      )
  }
}