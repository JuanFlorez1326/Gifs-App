import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor( 
    private readonly http: HttpClient 
  ) { }

  private apiKey: string = 'fxFFfmGrMf1nffARUk46my9E4vCHDemv';
  private _history: string[] = [];
  public results: Gif[] = [];

  get history(){
    return [...this._history];
  }

  searchGifs( query: string = '' ){
    query = query.trim().toLowerCase();

    if ( !this._history.includes( query)) {
      this._history.unshift( query );
      this._history = this._history.splice(0, 12);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=12`)
      .subscribe(
        (res) => {
          this.results = res.data;
          console.log(res.data);
        }
      )
  }
}