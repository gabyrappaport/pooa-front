import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pre-paiement',
  templateUrl: './pre-paiement.component.html',
  styleUrls: ['./pre-paiement.component.scss']
})
export class PrePaiementComponent implements OnInit {
  type:string;
  @Input() edit: boolean;
  constructor() {
    this.type="Acompte";
  }

  ngOnInit() {
  }

}
