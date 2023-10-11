import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasEditarComponent } from './mesas-editar.component';

describe('MesasEditarComponent', () => {
  let component: MesasEditarComponent;
  let fixture: ComponentFixture<MesasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesasEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
