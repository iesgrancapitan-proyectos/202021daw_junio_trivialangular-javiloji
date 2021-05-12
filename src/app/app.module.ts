import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JuegosComponent } from './juegos/juegos.component';
import { SeleccionJugadoresComponent } from './seleccion-jugadores/seleccion-jugadores.component';

const rutas: Routes = [
  { path: '', component: JuegosComponent },
  { path: 'seleccion/:id', component: SeleccionJugadoresComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    JuegosComponent,
    SeleccionJugadoresComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
