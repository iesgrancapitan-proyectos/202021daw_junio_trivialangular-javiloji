import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SeleccionJugadoresComponent } from './../seleccion-jugadores/seleccion-jugadores.component';
import { PruebaService } from '../prueba.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit, AfterViewInit {

  public id: any = "";
  public arrayCategorias: any = [];
  public preguntas: any = [];
  public respuestas: any = [];

  public respuestaUnica: any = [];

  public arrayJugadores: any = [];
  public numeroRondas: any = 2;


  indexQuiz = 0;
  aciertos = 0;
  respuestaValidaNombre = "";
  respuestaClicada = "";
  quizCompleted = false;
  // ache = "";

  constructor(private route: ActivatedRoute, private http: HttpClient, private seleccion: SeleccionJugadoresComponent, private pruebaService: PruebaService) {
    this.asignarJugadores();
    this.numeroRondas = pruebaService.numeroRondas;
    console.log(this.preguntas);
    // console.log(pruebaService.numeroJugadores);
    // console.log(seleccion.numeroJugadores.value);
    // this.ache = seleccion.numeroJugadores;
    this.primerTurno(this.arrayJugadores);
  }

  asignarJugadores() {
    if (this.pruebaService.numeroJugadores.length == 0) {
      console.log("entro");
      let arrayJugadoresStorage = localStorage.getItem('jugadores');
      if (arrayJugadoresStorage) this.arrayJugadores = JSON.parse(arrayJugadoresStorage);
    } else {
      console.log("else");
      this.arrayJugadores = this.pruebaService.numeroJugadores;
    }
    console.log(this.arrayJugadores);
  }

  primerTurno(arrayJugadores: any) {
    return arrayJugadores[0].turno = true;
  }

  cambiarTurno(arrayJugadores: any) {

    let jugadorACambiar: any = 0;

    for (let i = 0; i < arrayJugadores.length; i++) {

      if (arrayJugadores[i].turno == true) {
        if (jugadorACambiar < (arrayJugadores.length)) {
          jugadorACambiar = i + 1;
        }
        arrayJugadores[i].turno = false;
      }

      if (jugadorACambiar == (arrayJugadores.length)) {
        jugadorACambiar = 0;
      }
    }

    return arrayJugadores[jugadorACambiar].turno = true;

  }

  shuffle(array: any) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  calcularSiguientePregunta() {
    for (let i = 0; i < this.respuestas.length; i++) {
      if (this.respuestas[i]["idPregunta"] == this.preguntas[0]["id"]) {
        this.respuestaUnica.push(this.respuestas[i]);
      }
    }

  }


  avanzar() {
    let array = this.preguntas;

    this.respuestaValidaNombre = "";
    this.respuestaClicada = "";
    // if (array.length - 1 > this.indexQuiz) {
    //   this.indexQuiz++;
    // } 
    // if(this.indexQuiz >= array.length){
    //   this.indexQuiz= 0;
    // }
    array = this.preguntas.splice(0, 1);

    console.log(this.preguntas);


    // else {

    // }
    this.respuestaUnica = [];
    this.calcularSiguientePregunta();
    // console.log(this.arrayJugadores);
    this.cambiarTurno(this.arrayJugadores);
    // console.log(this.arrayJugadores);
  }

  elegirRespuesta(respuesta: any, arrayRespuestas: any, arrayJugadores: any) {

    let that = this;
    this.respuestaClicada = respuesta.respuesta;

    if (parseInt(respuesta.valida)) {
      this.aciertos++;
      for (let i = 0; i < arrayJugadores.length; i++) {

        if (arrayJugadores[i].turno == true) {
          arrayJugadores[i].puntosJugador += 1;
        }

        if (this.arrayJugadores[i].puntosJugador == this.numeroRondas) {
          this.quizCompleted = true;

        }

      }
    }



    arrayRespuestas.forEach((element: any) => {
      if (element.valida == 1) {
        that.respuestaValidaNombre = element.respuesta;


      }
    });
  }

  getRespuestas() {


    let that = this;
    this.http.get('http://localhost/proyectoDaw/respuestas').subscribe((data: any) => {
      that.respuestas = data;
      that.calcularSiguientePregunta();
      that.shuffle(this.respuestaUnica);

    })
  }
  getPreguntas() {
    let that = this;
    this.http.get('http://localhost/proyectoDaw/preguntas').subscribe((data: any) => {

      for (let i = 0; i < data.length; i++) {
        if (that.arrayCategorias.includes(data[i].categoria)) {
          that.preguntas.push(data[i]);
        }
      }


      that.shuffle(this.preguntas);


      that.getRespuestas();


    })
  }
  getCategorias() {
    let that = this;
    this.http.get('http://localhost/proyectoDaw/familiaCategoria').subscribe((categorias: any) => {

      for (let i = 0; i < categorias.length; i++) {
        if (categorias[i]['id_familia'] == this.route.snapshot.paramMap.get("id")) {
          that.arrayCategorias.push(categorias[i]['id_categoria']);
        };
      }

      that.getPreguntas();

    })



  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.getCategorias();
  }

}
