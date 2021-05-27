import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit, AfterViewInit  {

  public id:any = "";
  public arrayCategorias:any = [];
  public preguntas:any = [];
  public respuestas:any = [];

  public respuestaUnica:any = [];


  indexQuiz = 0;
  aciertos = 0;
  respuestaValidaNombre = "";
  respuestaClicada = "";
  quizCompleted = false;
  
  constructor(private route: ActivatedRoute, private http:HttpClient) { 

    this.http.get('http://localhost/proyectoDaw/familiaCategoria').toPromise().then(categorias => {

      const jsonCategorias: any[] = Array.of(categorias);

      for (let i = 0; i < jsonCategorias[0].length; i++) {
        
        if(jsonCategorias[0][i]['id_familia'] == this.route.snapshot.paramMap.get("id")){
          this.arrayCategorias.push(jsonCategorias[0][i]['id_categoria']);
        };
      }
    })

    this.http.get('http://localhost/proyectoDaw/preguntas').toPromise().then(data => {

      const usersJson: any[] = Array.of(data);

      console.log(usersJson[0][2]['categoria']);

      for (let j = 0; j < this.arrayCategorias.length; j++) {
        // console.log(this.arrayCategorias[j]);

        for (let i = 0; i < usersJson[0].length; i++) {
          // console.log(this.arrayCategorias[j]);
          if(usersJson[0][i]['categoria'] == this.arrayCategorias[j]){
            
            this.preguntas.push(usersJson[0][i]);
          };
          
          
        }
      }

      
        console.log(this.preguntas.length);
        console.log(this.preguntas);
        this.shuffle(this.preguntas);
        this.shuffle(this.respuestaUnica);
      
      // console.log(this.arrayCategorias[1]);

    // console.log(this.preguntas);
    // console.log(this.route.snapshot.paramMap.get("id"));
    })    

    this.http.get('http://localhost/proyectoDaw/respuestas').toPromise().then(data => {

      const respuestasJson: any[] = Array.of(data);

      console.log(respuestasJson);

        for (let i = 0; i < respuestasJson[0].length; i++) {
          this.respuestas.push(respuestasJson[0][i]);
          
        }

      
        console.log(this.respuestas);

        this.avanzar();
      
      // console.log(this.arrayCategorias[1]);

    // console.log(this.preguntas);
    // console.log(this.route.snapshot.paramMap.get("id"));
    })    

    
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


  avanzar() {
    this.respuestaValidaNombre = "";
    this.respuestaClicada = "";
    // console.log(this.indexQuiz, this.arrayBanderas.length)
    if (this.preguntas.length - 1 > this.indexQuiz) {
      this.indexQuiz++;
    } else {
      // console.log(this.aciertos);
      this.quizCompleted = true;
    }

    console.log(this.preguntas[this.indexQuiz]);

    // console.log(this.preguntas[this.indexQuiz]["id"]);

    // console.log(this.respuestas[0]);

    for (let i = 0; i < this.respuestas.length; i++) {
      
      if(this.respuestas[i]["idPregunta"]==this.preguntas[this.indexQuiz]["id"]){

        this.respuestaUnica.push(this.respuestas[i]);

      }
      
    }

    // console.log(this.respuestas[0]);
    console.log(this.respuestaUnica);
  }

  elegirRespuesta(respuesta: any, arrayRespuestas: any) {
    // console.log(respuesta, arrayRespuestas);
    let that = this;
    this.respuestaClicada = respuesta.respuesta;

    if (respuesta.valida) {
      this.aciertos++;
    }
    console.log(respuesta);

    this.respuestaUnica.forEach((element: any) => {
      if (element.valida) {
        that.respuestaValidaNombre = element.respuesta;
        console.log(that.respuestaValidaNombre);
      }
    });

  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

}
