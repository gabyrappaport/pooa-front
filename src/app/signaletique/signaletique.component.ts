import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-signaletique',
  templateUrl: './signaletique.component.html',
  styleUrls: ['./signaletique.component.scss']
})
export class SignaletiqueComponent implements OnInit {
  id_order: any;
  order: any;
  payment_toggle = false;
  delivery_toggle = false;

  constructor(private http: Http, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id_order = params['id_order'];
    });
  }

  ngOnInit() {
    this.http.request(environment.apiUrl + 'order?id_order=' + this.id_order)
      .subscribe(res => {
        const data = res.json();
        this.order = data.data;
      });
  }

  onChangePayment(event) {
    this.payment_toggle = event;
  }

  onChangeDelivery(event) {
    this.delivery_toggle = event;
  }

  submit() {
    console.log(this.order);
    this.http.put(environment.apiUrl + 'order', this.order).subscribe(
      res => {
        console.log('success');
      }, error => {
        console.log(error);
      }
    );
  }
}
