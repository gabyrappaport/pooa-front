import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Http} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-identite',
  templateUrl: './identite.component.html',
  styleUrls: ['./identite.component.scss']
})
export class IdentiteComponent implements OnInit {

  public order: any;
  public id: number;
  public myForm: FormGroup;
  public mode: boolean = false;
  @Input() edit: boolean;

  constructor(private fb: FormBuilder, private http: Http, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.http.request(environment.apiUrl + '/ordre', { params: { id: this.id }})
      .subscribe(res => {
        const data = res.json();
        this.order = data.order;
        console.log(this.order);
        this.myForm = this.fb.group({
          'paiementMode':[this.order.payment_type],
          'TT': [''],
          'DP': [''],
          'echeance': [this.order.echeance],
          'lDips': [this.order.lDips],
          'sOff': [this.order.sOff],
          'shipSample': [this.order.shipSample],
          'shipSampleCol': [this.order.shipSampleCol]
        });
        });
  }

  public modeTrue(): void {
    this.mode = true;
  }

  public modeFalse(): void {
    this.mode = false;
  }

  onSubmit(value){
    if (value.payment_type == "TT + DP") {
      value.payment_type = value.TT + '% TT + ' + value.DP + '% DP';
    }
    delete value.TT;
    delete value.DP;
    console.log(value);
    this.http.put(environment.apiUrl + 'ordre', value).subscribe( res => {
      console.log("COUCOUCOCUCOCU")}
    );
    this.http.request(environment.apiUrl + '/ordre', { params: { id: this.id }})
      .subscribe(res => {
        const data = res.json();
        this.order = data.order;
      });
  }
}

