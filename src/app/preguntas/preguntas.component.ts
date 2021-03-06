
import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy, Renderer2 } from '@angular/core';
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

  /** Voices */
  public sayCommand: string;
  public text: string;
  public voices: SpeechSynthesisVoice[];
  public voice_es: SpeechSynthesisVoice | null;

  public etiqueta: any = "";

  indexQuiz = 0;
  aciertos = 0;
  respuestaValidaNombre = "";
  respuestaClicada = "";
  quizCompleted = false;
  partidaEmpezada = false;
  preguntaAlmacenada = "";
  // ache = "";

  constructor(private route: ActivatedRoute, private http: HttpClient, private seleccion: SeleccionJugadoresComponent, private pruebaService: PruebaService, private renderer: Renderer2) {
    this.asignarJugadores();
    this.numeroRondas = pruebaService.numeroRondas;
    console.log(this.preguntas);
    this.primerTurno(this.arrayJugadores);

    /** Renderer2 */
    this.renderer.addClass(document.body, 'desactivarScroll');

    /** Voices */
    this.voices = [];
    this.voice_es = null;
    this.text = " ";
    this.sayCommand = "";
  }

  asignarJugadores() {
    if (this.pruebaService.numeroJugadores.length == 0) {
      let arrayJugadoresStorage = localStorage.getItem('jugadores');
      if (arrayJugadoresStorage) this.arrayJugadores = JSON.parse(arrayJugadoresStorage);
    } else {
      this.arrayJugadores = this.pruebaService.numeroJugadores;
    }
    // console.log(this.arrayJugadores);
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

    // El bot dice en voz alta el t??tulo de la pregunta
    if (this.partidaEmpezada) {
      this.speak(this.preguntas[0].pregunta);
    } else {
      this.preguntaAlmacenada = this.preguntas[0].pregunta;
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

    // console.log(this.preguntas);


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

          if (this.arrayJugadores[i].puntosJugador < this.numeroRondas) {
            this.reproducirAudio("respuestaCorrecta");
          }
        }

        if (this.arrayJugadores[i].puntosJugador == this.numeroRondas) {
          this.quizCompleted = true;
          this.reproducirAudio("aplausos");
        }

      }
    }



    arrayRespuestas.forEach((element: any) => {
      if (element.valida == 1) {
        that.respuestaValidaNombre = element.respuesta;
      }
    });
  }

  establecerObjetoExterno(objeto: any) {
    this.etiqueta = "";

    if (objeto.tipoObjeto == "Link") {
      this.etiqueta = `<iframe width='300' height='300' src="` + objeto.Objeto + `"  frameborder='0' allowfullscreen></iframe>`;
    }
    if (objeto.tipoObjeto == "Imagen") {
      this.etiqueta = `<img width='300' height='300' src="http://localhost/sabiogc/` + objeto.Objeto + `" />`;
    }

    console.log(this.etiqueta);
    // return this.etiqueta;

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

      console.log(that.preguntas);
      console.log(that.preguntas[0].objeto);

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

    /** VOICES */
    this.voices = speechSynthesis.getVoices();
    this.updateSayCommand();

    if (!this.voices.length) {

      speechSynthesis.addEventListener(
        "voiceschanged",
        () => {

          this.voices = speechSynthesis.getVoices();
          this.voice_es = (this.voices[4] || null);
          this.updateSayCommand();

        }
      );

    }
  }

  // I synthesize speech from the current text for the currently-selected voice.
  public speak(pregunta: string): void {

    if (!this.voice_es || !this.text) {

      return;

    }

    this.text = pregunta;
    // console.log(this.voice_es);
    // console.log(this.text);

    this.stop();
    this.synthesizeSpeechFromText(this.voice_es, this.text);
  }


  // I stop any current speech synthesis.
  public stop(): void {

    if (speechSynthesis.speaking) {

      speechSynthesis.cancel();

    }

  }


  // I update the "say" command that can be used to generate the a sound file from the
  // current speech synthesis configuration.
  public updateSayCommand(): void {

    if (!this.voice_es || !this.text) {

      return;

    }

    // With the say command, the rate is the number of words-per-minute. As such, we
    // have to finagle the SpeechSynthesis rate into something roughly equivalent for
    // the terminal-based invocation.
    var sanitizedText = this.text
      .replace(/[\r\n]/g, " ")
      .replace(/(["'\\\\/])/g, "\\$1")
      ;

    // console.log(this.voice_es.name);
    this.sayCommand = `say --voice ${this.voice_es.name} --output-file=demo.aiff "${sanitizedText}"`;

  }

  // ---
  // PRIVATE METHODS.
  // ---

  // I perform the low-level speech synthesis for the given voice, rate, and text.
  private synthesizeSpeechFromText(
    voice: SpeechSynthesisVoice,
    text: string
  ): void {
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice_es;

    speechSynthesis.speak(utterance);
  }

  public reproducirAudio(texto: String) {
    let audio = new Audio();
    audio.src = '../../assets/mp3/' + texto + '.mp3';
    // new Audio('../../assets/mp3/' + texto + '.mp3').play();

    setTimeout(function () {
      audio.play();

      setTimeout(function () {
        audio.pause();
        audio.currentTime = 0;
      }, 4000);
    }, 0);
  }

  public comenzarPartida() {
    this.partidaEmpezada = true;
    this.renderer.removeClass(document.body, 'desactivarScroll');
    this.speak(this.preguntaAlmacenada);
  }

}