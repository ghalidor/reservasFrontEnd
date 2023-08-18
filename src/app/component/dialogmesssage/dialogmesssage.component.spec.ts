import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmesssageComponent } from './dialogmesssage.component';

describe('DialogmesssageComponent', () => {
  let component: DialogmesssageComponent;
  let fixture: ComponentFixture<DialogmesssageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmesssageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogmesssageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
