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

  constructor(private route: ActivatedRoute, private http:HttpClient) { 
    this.http.get('http://localhost/proyectoDaw/juegos').toPromise().then(data => {
      console.log(data);
      
      this.array = data;

    console.log(this.route.snapshot.paramMap.get("id"));
    })
  }

  ngOnInit(): void {
    
  }

}
