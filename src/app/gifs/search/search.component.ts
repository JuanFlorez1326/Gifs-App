import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>;

  searchGifs(){
    const value = this.txtSearch.nativeElement.value;
    console.log( this.txtSearch );
    console.log( value );
    this.txtSearch.nativeElement.value = '';
  }
}