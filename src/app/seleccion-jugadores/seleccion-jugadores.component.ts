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
export class SeleccionJugadoresComponent {

  public idJuego: any = "";
  public arrayJuegos = "";
  public tituloJuego;
  // public numeroJugadores: any = "";
  public selectedOption: any;

  numeroJugadores: any = [];
  iconitos: any = ["cactus.png", "cerdito.png", "hamburguesa.png", "helado.png", "monstruo.png", "pizza.png", "robot.png", "viking.png"];

  constructor(private route: ActivatedRoute, public pruebaService: PruebaService) {

    for (let i = 0; i < this.pruebaService.arrayJuegos.length; i++) {

      if (this.pruebaService.arrayJuegos[i]["id_familia"] == this.route.snapshot.paramMap.get("id")) {
        this.tituloJuego = this.pruebaService.arrayJuegos[i]["titulo"];
      }

    }

    // this.idJuego = this.route.snapshot.paramMap.get("id");

    // console.log(this.numeroJugadores.name);
  }

  // hola():void{
  //   console.log("hola");
  // }

  // onSubmit(event: any) {
  //   return event.target.numeroJugadores.value;
  // }
  ngOnInit(): void {

  }

  capturarCantidadJugadores() {
    // console.log(this.selectedOption);
    return this.selectedOption;
  }

  calcularJugadores() {
    let that = this;
    that.numeroJugadores = []

    for (let i = 1; i <= that.selectedOption; i++) {
      that.numeroJugadores.push(i);
    }
  }

  asignarIconito() {
    let that = this;
    let random = Math.floor(Math.random() * that.iconitos.length);
    console.log(random);
    let iconitoAsignado = that.iconitos[random];
    console.log("array",that.iconitos);
    that.iconitos.splice(random, 1);
    console.log(iconitoAsignado);
    console.log("array con uno eliminado", that.iconitos);
    return iconitoAsignado;
  }

}
