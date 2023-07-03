import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
//Llamar a la clase Gif del JSON
import {Gif} from '../../interfaces/gifs.interface';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',

})
export class HomePageComponent {

  constructor(private gifsSevice: GifsService){}

  get gifs(): Gif[]{
    return this.gifsSevice.gifList;
  }
}
