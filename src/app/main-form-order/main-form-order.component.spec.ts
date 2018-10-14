import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFormOrderComponent } from './main-form-order.component';

describe('MainFormOrderComponent', () => {
  let component: MainFormOrderComponent;
  let fixture: ComponentFixture<MainFormOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFormOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFormOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
