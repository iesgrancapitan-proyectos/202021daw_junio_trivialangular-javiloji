import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seleccion-jugadores',
  templateUrl: './seleccion-jugadores.component.html',
  styleUrls: ['./seleccion-jugadores.component.css']
})
export class SeleccionJugadoresComponent implements OnInit {

  public id:any = "";
  public array:any = [];
  public preguntas:any = [];

  constructor(private route: ActivatedRoute, private http:HttpClient) { 
    this.http.get('http://localhost/proyectoDaw/preguntas').toPromise().then(data => {
      // console.log(data);
      
      this.array = data;
      const usersJson: any[] = Array.of(data);
      console.log(usersJson[0]);


      for (let i = 0; i < usersJson[0].length; i++) {
        
        if(usersJson[0][i]['categoria'] == "Poesía"){
          this.preguntas.push(usersJson[0][i]);
        };
        
      }

    console.log(this.preguntas);
    console.log(this.route.snapshot.paramMap.get("id"));
    })

    
  }

  ngOnInit(): void {
    
  }

}
