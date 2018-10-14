import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signaletique',
  templateUrl: './signaletique.component.html',
  styleUrls: ['./signaletique.component.scss']
})
export class SignaletiqueComponent implements OnInit {
  editId = false;
  editExpedition = false;
  editProforma = false;
  editPre = false;
  editFacture = false;
  editPaiement = false;
  constructor() {
  }

  ngOnInit() {
  }

}
