import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-expedition',
  templateUrl: './expedition.component.html',
  styleUrls: ['./expedition.component.scss']
})
export class ExpeditionComponent implements OnInit {

  newExpedForm: FormGroup;

  public expeditions: any;
  public id_order: any;
  public order: any;
  public new_exped_b = false;
  public unsent_products = [];
  public unsent_products_ref = [];
  public selected_products = [];
  public product_map = {};

  constructor(private http: Http,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
    this.newExpedForm = fb.group({
      'expedition_date': '',
      'transportation': '',
      'departure_location': '',
      'arrival_location': '',
    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.id_order = params['id_order'];
    });
  }

  ngOnInit() {
    this.http.request(environment.apiUrl + 'order?id_order=' + this.id_order)
      .subscribe(res => {
        const data = res.json();
        this.order = data.data;
        console.log(this.order);
        this.unsent_products = this.order.products;
        let p;
        for (p in this.unsent_products) {
          let product = this.unsent_products[p];
          this.unsent_products_ref.push(product.reference);
          this.product_map[product.reference] = product;
        }
        this.get_shipment_by_id();
      });

  }

  private get_shipment_by_id() {
    this.http.request(environment.apiUrl + 'shipment?id_order=' + this.id_order)
      .subscribe(res => {
        const data2 = res.json();
        this.expeditions = data2.data;
        let e;
        for (e in this.expeditions) {
          let products = this.expeditions[e].products;
          this.unsent_products = this.arr_diff(this.unsent_products, products);
        }
        console.log(this.unsent_products);
      });
  }

  private arr_diff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++) {
      a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
      if (a[a2[i]]) {
        delete a[a2[i]];
      }
    }
    for (var k in a) {
      diff.push(k);
    }
    return diff;
  }

  public new_exped(): void {
    this.new_exped_b = !this.new_exped_b;
  }

  public selected_product(value: any): void {
    this.selected_products.push(value.text);
  }

  public removed_product(value: any): void {
    const index = this.selected_products.indexOf(value.text);
    this.selected_products.splice(index, 1);
  }

  public refresh_products(value) {
  }

  onNewExpedSubmit(value) {
    this.new_exped();
    console.log(this.selected_products);
    console.log(value);
    let expedition = value;
    let p;
    let products = [];
    for (p in this.selected_products) {
      let product = this.product_map[this.selected_products[p]];
      products.push(product.id_product);
    }
    expedition["products"] = products;
    console.log(expedition);
    this.http.post(environment.apiUrl + 'shipment', expedition)
        .subscribe(res => {
          this.get_shipment_by_id();
        });
  }
  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }
}
