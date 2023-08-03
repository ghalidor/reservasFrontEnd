import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutclienteComponent } from './layoutcliente.component';

describe('LayoutclienteComponent', () => {
  let component: LayoutclienteComponent;
  let fixture: ComponentFixture<LayoutclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutclienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
