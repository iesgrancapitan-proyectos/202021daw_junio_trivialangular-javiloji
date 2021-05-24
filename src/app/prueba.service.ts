import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  public arrayJuegos:any = [];
  public accesoFacturacion = "";
  
  constructor(private http:HttpClient) { 
    
    this.http.get('http://localhost/proyectoDaw/juegos').toPromise().then(data => {
      
      this.arrayJuegos = data;
    })
  }
}
