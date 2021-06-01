import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { JuegosComponent } from './../juegos/juegos.component';
import { PruebaService } from './../prueba.service';

@Component({
  selector: 'app-seleccion-jugadores',
  templateUrl: './seleccion-jugadores.component.html',
  styleUrls: ['./seleccion-jugadores.component.css']
})
export class SeleccionJugadoresComponent  {

  public idJuego:any = "";
  public arrayJuegos = "";
  public tituloJuego;
  public numeroJugadores: any = "";

  constructor(private route: ActivatedRoute, public pruebaService: PruebaService) { 

    for (let i = 0; i < this.pruebaService.arrayJuegos.length; i++) {
      
      if(this.pruebaService.arrayJuegos[i]["id_familia"] == this.route.snapshot.paramMap.get("id")){
        this.tituloJuego = this.pruebaService.arrayJuegos[i]["titulo"];
      }
      
    }

    this.idJuego = this.route.snapshot.paramMap.get("id");

    console.log(this.numeroJugadores.name);
  }

  hola():void{
    console.log("hola");
  }

  // onSubmit(event: any) {
  //   return event.target.numeroJugadores.value;
  // }
  ngOnInit(): void {

  }

}
