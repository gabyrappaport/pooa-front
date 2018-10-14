import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrePaiementComponent } from './pre-paiement.component';

describe('PrePaiementComponent', () => {
  let component: PrePaiementComponent;
  let fixture: ComponentFixture<PrePaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrePaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
