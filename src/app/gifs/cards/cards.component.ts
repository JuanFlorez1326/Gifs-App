import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent {
  
  constructor(
    private readonly gifsService: GifsService
  ) { }

  get results(){
    return this.gifsService.results;
  }
}