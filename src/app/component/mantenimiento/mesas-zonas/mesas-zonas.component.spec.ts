import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasZonasComponent } from './mesas-zonas.component';

describe('MesasZonasComponent', () => {
  let component: MesasZonasComponent;
  let fixture: ComponentFixture<MesasZonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesasZonasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesasZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
