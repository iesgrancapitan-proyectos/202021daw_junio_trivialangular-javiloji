import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {

  public id:any = "";
  public arrayCategorias:any = [];
  public preguntas:any = [];

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
        
      
      // console.log(this.arrayCategorias[1]);

    // console.log(this.preguntas);
    // console.log(this.route.snapshot.paramMap.get("id"));
    })    
  }

  ngOnInit(): void {
  }

}
