import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-main-form-order',
  templateUrl: './main-form-order.component.html',
  styleUrls: ['./main-form-order.component.scss']
})

export class MainFormOrderComponent implements OnInit {

  myForm: FormGroup;

  public products: any;
  public clients_array: Array<string>;
  public clients_map: any;
  public suppliers_map: any;
  public suppliers_array: Array<string>;
  public tt_dp_selected = false;
  public payment_type: any;
  public total_price = 0;
  public commission = 0;
  public l_dips: any;
  public appro_ship_sample: any;
  public appro_s_off: any;
  public ship_sample_2h: any;
  public expected_delivery_date: any;
  public error_message = '';
  private selected_client: {
    id: '',
    text: ''
  };
  private selected_supplier: {
    id: '',
    text: ''
  };
  public json: any;

  constructor(fb: FormBuilder, private http: Http, private router: Router) {
    this.myForm = fb.group({
      'payment_type': ['LC'],
      'TT': [''],
      'DP': [''],
      'l_dips': ['OK'],
      'appro_s_off': ['OK'],
      'appro_ship_sample': ['OK'],
      'ship_sample_2h': ['SSAttF']
    });
  }

  ngOnInit() {
    this.http.request(environment.apiUrl + 'partner?partner_type=client')
      .subscribe(res => {
        const data = res.json();
        console.log(res);
        this.clients_array = [];
        this.clients_map = new Map();
        for (let i in data.data) {
          this.clients_map.set(data.data[i]['company'], data.data[i]['id_partner']);
          this.clients_array.push(data.data[i]['company']);
        }
      });

    this.http.request(environment.apiUrl + 'partner?partner_type=supplier')
      .subscribe(res => {
        const data = res.json();
        this.suppliers_array = [];
        this.suppliers_map = new Map();
        for (let i in data.data) {
          this.suppliers_map.set(data.data[i]['company'], data.data[i]['id_partner']);
          this.suppliers_array.push(data.data[i]['company']);
        }
      });

    this.products = [
      {
        'id': 1,
        'reference': '',
        'commission': 0,
        'color': '',
        'meter': '',
        'price': ''
      }];
  }

  addNewChoice() {
    const newItemNo = Math.max.apply(Math, this.products.map(function (o) {
      return o.id;
    })) + 1;
    this.products.push({
      'id': newItemNo,
      'reference': '',
      'commission': 0,
      'color': '',
      'meter': '',
      'price': ''
    });
  }

  removeChoice(productId: number) {
    const index = this.products.indexOf(this.products.find(x => x.id === productId));
    this.products.splice(index, 1);
  }

  updateMontant(): void {
    let montant = 0;
    for (let i in this.products) {
      const produit = this.products[i];
      montant = montant + produit.price * produit.meter;
    }
    this.total_price = montant;
  }

  onSubmit(value) {
    if (value.payment_type == 'TT + DP') {
      value.payment_type = value.TT + '% TT + ' + value.DP + '% DP';
    }
    delete value.TT;
    delete value.DP;
    if (this.selected_client === undefined) {
      this.error_message = 'Veuillez entrer des données valides.';
    }
    else if (this.selected_supplier === undefined) {
      this.error_message = 'Veuillez entrer des données valides.';
    }
    else {
      const order = {
        'id_supplier': this.suppliers_map.get(this.selected_supplier.text),
        'id_client': this.clients_map.get(this.selected_client.text),
        'expected_delivery_date': this.expected_delivery_date,
        'payment_type': value.payment_type,
        'products': this.products,
        'l_dips': value.l_dips,
        'appro_ship_sample': value.appro_ship_sample,
        'appro_s_off': value.appro_s_off,
        'ship_sample_2h': value.ship_sample_2h,
      };
      this.http.post(environment.apiUrl + 'order', order)
        .subscribe(res => {
          this.router.navigate(['/recaporder']);
        }, error => {
          if (error.status !== 200) {
            this.error_message = 'Veuillez entrer des données valides.';
          }
        });

    }
  }

  public tt_dp_select(value: any): void {
    this.tt_dp_selected = true;
  }

  public tt_dp_unselect(value: any): void {
    this.tt_dp_selected = false;
  }

  public refresh_client(value: any): void {
    this.selected_client = value;
  }

  public refresh_supplier(value: any): void {
    this.selected_supplier = value;
  }

}
