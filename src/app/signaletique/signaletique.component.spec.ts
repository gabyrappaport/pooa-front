import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaletiqueComponent } from './signaletique.component';

describe('SignaletiqueComponent', () => {
  let component: SignaletiqueComponent;
  let fixture: ComponentFixture<SignaletiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaletiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaletiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
