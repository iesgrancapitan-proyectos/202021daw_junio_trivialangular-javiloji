import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SeleccionJugadoresComponent } from './../seleccion-jugadores/seleccion-jugadores.component';

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


  indexQuiz = 0;
  aciertos = 0;
  respuestaValidaNombre = "";
  respuestaClicada = "";
  quizCompleted = false;
  ache = "";

  constructor(private route: ActivatedRoute, private http: HttpClient, private seleccion:SeleccionJugadoresComponent) {

    console.log(seleccion.numeroJugadores);
    // console.log(seleccion.numeroJugadores.value);
    this.ache = seleccion.numeroJugadores;

    /* this.http.get('http://localhost/proyectoDaw/familiaCategoria').subscribe(categorias => {
 
       const jsonCategorias: any[] = Array.of(categorias);
 
       for (let i = 0; i < jsonCategorias[0].length; i++) {
         
         if(jsonCategorias[0][i]['id_familia'] == this.route.snapshot.paramMap.get("id")){
           this.arrayCategorias.push(jsonCategorias[0][i]['id_categoria']);
         };
       }
     })
 
    // this.http.get('http://localhost/proyectoDaw/preguntas').toPromise().then(data => {
     this.http.get('http://localhost/proyectoDaw/preguntas').subscribe(data => {
       console.log("datos", data);
       const usersJson: any[] = Array.of(data);
       console.log(usersJson);
       // console.log(usersJson[0][2]['categoria']);
       console.log(this.arrayCategorias);
       for (let j = 0; j < this.arrayCategorias.length; j++) {
         // console.log(this.arrayCategorias[j]);
         
         
         for (let i = 0; i < usersJson[0].length; i++) {
           // console.log(this.arrayCategorias[j]);
           if(usersJson[0][i]['categoria'] == this.arrayCategorias[j]){
             
             this.preguntas.push(usersJson[0][i]);
           };
           
           
         }
       }
 
       
 
       
         // console.log(this.preguntas.length);
          console.log(this.preguntas);
         this.shuffle(this.preguntas);
         this.shuffle(this.respuestaUnica);
       
       // console.log(this.arrayCategorias[1]);
 
     // console.log(this.preguntas);
     // console.log(this.route.snapshot.paramMap.get("id"));
     })    
 
     this.http.get('http://localhost/proyectoDaw/respuestas').subscribe(data => {
 
       const respuestasJson: any[] = Array.of(data);
 
       // console.log(respuestasJson);
 
         for (let i = 0; i < respuestasJson[0].length; i++) {
           this.respuestas.push(respuestasJson[0][i]);
           
         }
 
       
         // console.log(this.respuestas);
 
         this.avanzar();
       
       // console.log(this.arrayCategorias[1]);
 
     // console.log(this.preguntas);
     // console.log(this.route.snapshot.paramMap.get("id"));
     })    
 
     */
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

  calcularSiguientePregunta(){
      for (let i = 0; i < this.respuestas.length; i++) {
        if (this.respuestas[i]["idPregunta"] == this.preguntas[this.indexQuiz]["id"]) {
          this.respuestaUnica.push(this.respuestas[i]);
        }
      }

  }


  avanzar() {
    this.respuestaValidaNombre = "";
    this.respuestaClicada = "";
    if (this.preguntas.length - 1 > this.indexQuiz) {
      this.indexQuiz++;
    } else {
     
      this.quizCompleted = true;
    }
    this.respuestaUnica = [];
    this.calcularSiguientePregunta();

  }

  elegirRespuesta(respuesta: any, arrayRespuestas: any) {
    
    let that = this;
    this.respuestaClicada = respuesta.respuesta;
    
    if (parseInt(respuesta.valida)) {
      this.aciertos++;
    }
    arrayRespuestas.forEach((element: any) => {
      if (element.valida == 1) {
        that.respuestaValidaNombre = element.respuesta;
        
      }
    });

  }
  getRespuestas() {
    

    let that = this;
    this.http.get('http://localhost/proyectoDaw/respuestas').subscribe((data : any) => {
        that.respuestas = data;
          that.calcularSiguientePregunta();
          that.shuffle(this.respuestaUnica);

    })
  }
  getPreguntas() {
    let that = this;
    this.http.get('http://localhost/proyectoDaw/preguntas').subscribe( ( data : any) => {
      /*for (j = 0; j < this.arrayCategorias.length; j++) {
        for (i = 0; i < data.length; i++) {
          if (data[i]['categoria'] == this.arrayCategorias[j]) {
            console.log(data[i]['categoria']);
            that.preguntas.push(data[i]);
          }

        }

      }*/
      
      for (let i = 0; i < data.length; i++) {
        if(that.arrayCategorias.includes(data[i].categoria)){
          that.preguntas.push(data[i]);
        }
      }

      
      that.shuffle(this.preguntas);
      

      that.getRespuestas();

   
    })
  }
  getCategorias() {
    let that = this;
    this.http.get('http://localhost/proyectoDaw/familiaCategoria').subscribe((categorias : any) => {
      
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
