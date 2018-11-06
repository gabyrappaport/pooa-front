import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-identite',
  templateUrl: './identite.component.html',
  styleUrls: ['./identite.component.scss']
})
export class IdentiteComponent implements OnInit {


  public id_order: any;
  public order: any;
  public client: any;
  public supplier: any;
  public id_form: FormGroup;
  public mode: boolean = false;
  @Input() edit: boolean;

  constructor(private fb: FormBuilder, private http: Http, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id_order = params['id_order'];
    });
  }

  ngOnInit() {
    this.http.request(environment.apiUrl + 'order?id_order=' + this.id_order)
      .subscribe(res => {
        const data = res.json();
        this.order = data.data;
        this.id_form = this.fb.group({
          'paiementMode': [this.order.payment_type],
          'TT': [''],
          'DP': [''],
          'l_dips': [this.order.l_dips],
          'appro_s_off': [this.order.appro_s_off],
          'shipSample': [this.order.shipSample],
          'ship_sample_2h': [this.order.ship_sample_2h]
        });
        this.http.request(environment.apiUrl + 'partner?id_partner=' + this.order.id_client)
          .subscribe(res => {
            const data = res.json();
            this.client = data.data.company;
          });

        this.http.request(environment.apiUrl + 'partner?id_partner=' + this.order.id_supplier)
          .subscribe(res => {
            const data = res.json();
            this.supplier = data.data.company;
          });
      });
  }

  public modeTrue(): void {
    this.mode = true;
  }

  public modeFalse(): void {
    this.mode = false;
  }

  onSubmit(value) {
    if (value.payment_type == 'TT + DP') {
      value.payment_type = value.TT + '% TT + ' + value.DP + '% DP';
    }
    delete value.TT;
    delete value.DP;
    this.http.put(environment.apiUrl + 'ordre', value).subscribe(res => {
    });
    this.http.request(environment.apiUrl + '/ordre', {params: {id: this.id_order}})
      .subscribe(res => {
        const data = res.json();
        this.order = data.order;
      });
  }
}

