import { Component, OnInit, Input } from '@angular/core';
import { UiSwitchModule } from 'ngx-toggle-switch';

@Component({
  selector: 'app-proforma',
  templateUrl: './proforma.component.html',
  styleUrls: ['./proforma.component.scss']
})
export class ProformaComponent implements OnInit {
  proforma: any;
  @Input() edit: boolean;
  constructor() {
    this.proforma = {
      "numero": 14355,
      "date": "10/10",
      "signature": true,
      "signe": false
    }
  }

  onChange(value:any):void {
    this.proforma.signature = value;
    if(!value){
      this.proforma.signe = false;
    }
  }

  ngOnInit() {
    console.log(this.edit);
  }

}
