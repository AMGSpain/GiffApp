import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  //Constructor
  private _tagsHistory: string[] = [];
  private apiKey: string = '1O6HVo3rSQLL2j5cAjFmpbOe1nH7H9Wl';

  public gifList: Gif[]=[];

  constructor(private http: HttpClient) {
    //Cargar el historial:
    this.loadLocalStorage();
    console.log('Los Gifs estan preparados')
  }

  get tagsHistory(){
    //Devolver Constructor
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    //Para no dejar guardar el mismo tag por la web
    if( this._tagsHistory.includes(tag)){
      this._tagsHistory=this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    //Insertamos el tag de nuevo:
    this._tagsHistory.unshift(tag);

    //El número no puede ser mayor a 10 búsquedas:
    this._tagsHistory = this._tagsHistory.splice(0,10);

    //Guardar el Historial:
    this.saveLocalStorage();
  }

  //Guardar el Historial:
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  //Leer Historial:
  private loadLocalStorage():void{
    if(localStorage.getItem('history')){
      //Si tiene Historial lo carga:
      this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    }else{
      //Si no vuelve:
      return;
    }

    //Si el TagsHistory esta a 0 no devuelvas nada:
    if (this._tagsHistory.length === 0) {
      return;

    }else{
      //Si en el TagsHistory hay algo devuelvelo:
      this.searchTag(this._tagsHistory[0]);
    }
  }

  searchTag(tag: string): void{
    if(tag.length===0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q',tag)


    this.http.get<SearchResponse>('https://api.giphy.com/v1/gifs/search',{params}).subscribe( resp => {
      this.gifList = resp.data;
      console.log({gifs: this.gifList})

  });


  }
}
