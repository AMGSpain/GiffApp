import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //Constructor
  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory(){
    //Devolver Constructor
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void{
    this._tagsHistory.unshift(tag);

    console.log(this.tagsHistory)
  }
}
