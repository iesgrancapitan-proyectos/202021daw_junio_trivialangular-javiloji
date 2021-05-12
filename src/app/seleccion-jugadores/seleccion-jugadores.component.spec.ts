import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionJugadoresComponent } from './seleccion-jugadores.component';

describe('SeleccionJugadoresComponent', () => {
  let component: SeleccionJugadoresComponent;
  let fixture: ComponentFixture<SeleccionJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionJugadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
