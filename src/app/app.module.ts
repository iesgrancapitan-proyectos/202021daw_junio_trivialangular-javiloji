import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { JuegosComponent } from './juegos/juegos.component';
import { TestComponent } from './test.component';

// const appRoutes: Routes = [
//   { path: '', Routes: RouterModule },
// ];

@NgModule({
  declarations: [
    AppComponent,
    JuegosComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
