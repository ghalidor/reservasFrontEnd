import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasEditarComponent } from './zonas-editar.component';

describe('ZonasEditarComponent', () => {
  let component: ZonasEditarComponent;
  let fixture: ComponentFixture<ZonasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonasEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
