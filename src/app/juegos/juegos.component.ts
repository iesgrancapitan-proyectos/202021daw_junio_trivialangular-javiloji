import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {
  
  public array:any = [];

  constructor(private http: HttpClient) { 
    this.http.get('http://192.168.1.136/pruebaProyecto/pruebaAngular/juegos').toPromise().then(data => {
      console.log(data);
      
      this.array = data;

    });
  }

  ngOnInit(): void {
  }

}