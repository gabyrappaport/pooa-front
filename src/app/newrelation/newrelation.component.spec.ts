import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewrelationComponent } from './newrelation.component';

describe('NewrelationComponent', () => {
  let component: NewrelationComponent;
  let fixture: ComponentFixture<NewrelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewrelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewrelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
