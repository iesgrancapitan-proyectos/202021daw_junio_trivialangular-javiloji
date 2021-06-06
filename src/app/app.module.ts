import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JuegosComponent } from './juegos/juegos.component';
import { SeleccionJugadoresComponent } from './seleccion-jugadores/seleccion-jugadores.component';
import { PreguntasComponent } from './preguntas/preguntas.component';

import { PruebaService } from './prueba.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material - formularios
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

const rutas: Routes = [
  { path: '', component: JuegosComponent },
  { path: 'seleccion/:id', component: SeleccionJugadoresComponent },
  { path: 'juego/:id', component: PreguntasComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    JuegosComponent,
    SeleccionJugadoresComponent,
    PreguntasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rutas),
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [
    PruebaService,
    SeleccionJugadoresComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
