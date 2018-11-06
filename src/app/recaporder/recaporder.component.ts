import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recaporder',
  templateUrl: './recaporder.component.html',
  styleUrls: ['./recaporder.component.scss']

})
export class RecaporderComponent implements OnInit {

  public suppliers_array = [];
  public clients_array = [];
  public clients_map = new Map();
  public suppliers_map = new Map();
  public orders: any;
  public selected_orders: any;
  public apiUrl = environment.apiUrl;
  private selected_suppliers = [];
  private selected_clients = [];
  private disabled = false;
  private select = true;

  constructor(private http: Http, private router: Router) {
    this.http.request(environment.apiUrl + 'order')
      .subscribe(res => {
        console.log(res);
        const data = res.json();
        console.log(data);
        this.orders = data.data;
        this.selected_orders = this.orders;
      });

    this.http.request(environment.apiUrl + 'partner?partner_type=client')
      .subscribe(res => {
        const data = res.json();
        this.clients_array = [];
        this.clients_map = new Map();
        for (let i in data.data) {
          this.clients_map.set(data.data[i]['id_partner'], data.data[i]['company']);
          this.clients_array.push(data.data[i]['company']);
        }
      });

    this.http.request(environment.apiUrl + 'partner?partner_type=supplier')
      .subscribe(res => {
        const data = res.json();
        this.suppliers_array = [];
        this.suppliers_map = new Map();
        for (let i in data.data) {
          this.suppliers_map.set(data.data[i]['id_partner'], data.data[i]['company']);
          this.suppliers_array.push(data.data[i]['company']);
        }
      });
  }

  ngOnInit() {

  }

  private _disabledV = '0';

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected_supplier(value: any): void {
    this.selected_suppliers.push(value.text);
    this.update();
  }

  public removed_supplier(value: any): void {
    const index = this.selected_suppliers.indexOf(value.text);
    this.selected_suppliers.splice(index, 1);
    this.update();
  }

  public selected_client(value: any): void {
    this.selected_clients.push(value.text);
    this.update();
  }

  public removed_client(value: any): void {
    const index = this.selected_clients.indexOf(value.text);
    this.selected_clients.splice(index, 1);
    this.update();
  }

  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }

  private update() {
    this.selected_orders = this.orders;
    if (this.selected_suppliers.length !== 0 && this.selected_clients.length !== 0) {
      this.selected_orders =
        this.selected_orders.filter(order => this.selected_suppliers.includes(this.suppliers_map.get(order['supplier']))
          || this.selected_clients.includes(this.suppliers_map.get(order['client'])));
    } else if (this.selected_clients.length !== 0) {
      this.selected_orders =
        this.selected_orders.filter(order => this.selected_clients.includes(this.clients_map.get(order['client'])));
    } else if (this.selected_suppliers.length !== 0) {
      this.selected_orders =
        this.selected_orders.filter(order => this.selected_suppliers.includes(this.suppliers_map.get(order['supplier'])));
    }
  }

  private onSelect() {
    this.select = !this.select;
  }

  public changePage(id) {
    this.router.navigate(['/signaletique'], {queryParams: {id_order: id}});
  }

  public download(id_order): void {
    this.http.request(environment.apiUrl + 'excel?id_order=' + id_order)
      .subscribe();
  }
}
