import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  public arrayJuegos: any = [];
  public accesoFacturacion = "";
  public textoDeInput: any = null;

  public numeroJugadores: any = [];

  constructor(private http: HttpClient) {
    this.getJuegos();
  }

  getJuegos() {
    this.http.get('http://localhost/proyectoDaw/juegos').subscribe(data => {

      this.arrayJuegos = data;
    })
  }

}
