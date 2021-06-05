import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  public selectedOption: any = 2;
  public numeroRondas: any = 2;

  iconitos: any = ["cactus.png", "cerdito.png", "hamburguesa.png", "helado.png", "monstruo.png", "pizza.png", "robot.png", "vikingo.png"];
  showError = false;

  constructor(private route: ActivatedRoute, private router: Router, public pruebaService: PruebaService, public el: ElementRef) {

    for (let i = 0; i < this.pruebaService.arrayJuegos.length; i++) {

      if (this.pruebaService.arrayJuegos[i]["id_familia"] == this.route.snapshot.paramMap.get("id")) {
        this.tituloJuego = this.pruebaService.arrayJuegos[i]["titulo"];
      }

    }

    this.idJuego = this.route.snapshot.paramMap.get("id");
  }

  // hola():void{
  //   console.log("hola");
  // }

  // onSubmit(event: any) {
  //   return event.target.pruebaService.numeroJugadores.value;
  // }
  ngOnInit(): void {
    this.calcularJugadores();
    this.generarJugadores();
  }

  capturarCantidadJugadores() {
    // console.log(this.selectedOption);
    return this.selectedOption;
  }

  calcularJugadores() {
    let that = this;
    that.pruebaService.numeroJugadores = []

    for (let i = 1; i <= that.selectedOption; i++) {
      that.pruebaService.numeroJugadores.push(i);
    }
  }

  generarJugadores() {
    this.pruebaService.numeroJugadores = [];
    this.iconitos = ["cactus.png", "cerdito.png", "hamburguesa.png", "helado.png", "monstruo.png", "pizza.png", "robot.png", "vikingo.png"];

    for (let i = 1; i <= this.selectedOption; i++) {
      this.pruebaService.numeroJugadores.push({
        numJugador: i,
        nombreJugador: "",
        iconoJugador: `../../assets/img/iconitos/${this.asignarIconito()}`,
        puntosJugador: 0,
        turno: false
      });

    }
  }

  asignarRondas(){
    this.pruebaService.numeroRondas = this.numeroRondas;
  }

  asignarIconito() {
    let iconos = this.iconitos;
    let random = Math.floor(Math.random() * iconos.length);
    // console.log(random);
    let iconitoAsignado = iconos[random];

    iconos = this.iconitos.splice(random,1);

    // console.log("array", this.iconitos);
    // let iconoBorrado = this.iconitos.splice(random, 1);
    // console.error("he borrado ", iconoBorrado);
    // console.log(iconitoAsignado);
    // console.log("array con uno eliminado", this.iconitos);
    return iconitoAsignado;
  }

  checkName() {
    let that = this;
    // console.log(this.pruebaService.numeroJugadores);
    // console.log("he entrado en check");
    console.log(that);

    this.pruebaService.numeroJugadores.forEach(function (item: any) {
      if (item.nombreJugador == "") {
        that.showError = true;
      }
      // console.log(item.nombreJugador);
    });

    if (!this.showError) {
      that.router.navigate(['/juego', this.idJuego]);
    } else {
      setTimeout(function () {
        that.showError = false;
      }, 1000);
    }
  }

}
