import { Component } from '@angular/core';
import { JsonService } from './json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pruebaAngular';

  constructor(public json: JsonService){
    this.json.getJson('http://localhost/pruebaProyecto/pruebaAngular/categorias').subscribe((res:any) => {
      console.log(res);
    });
  }
}
