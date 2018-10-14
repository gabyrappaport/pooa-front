import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionComponent } from './expedition.component';

describe('ExpeditionComponent', () => {
  let component: ExpeditionComponent;
  let fixture: ComponentFixture<ExpeditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpeditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
