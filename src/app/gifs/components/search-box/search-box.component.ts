import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){

  }


  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    //Para enviar el elemanto:
    this.gifsService.searchTag(newTag);

    //Para limpiar la caja:
    this.tagInput.nativeElement.value='';
  }
}
