import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaporderComponent } from './recaporder.component';

describe('RecaporderComponent', () => {
  let component: RecaporderComponent;
  let fixture: ComponentFixture<RecaporderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecaporderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecaporderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
