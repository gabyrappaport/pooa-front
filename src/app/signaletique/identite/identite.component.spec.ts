import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentiteComponent } from './identite.component';

describe('IdentiteComponent', () => {
  let component: IdentiteComponent;
  let fixture: ComponentFixture<IdentiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
