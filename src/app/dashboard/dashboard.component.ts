import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public month = [];
  public clients = [];
  public client_map = {};
  public clients_revenus = {};
  public total = {};
  public suppliers = [];
  public supplier_map = {};
  public suppliers_revenus = {
    'client_1': [12, 45, 0, 3, 2],
    'client_3': [4, 5, 0, 45, 6],
    'client_2': [2, 4, 10, 54, 4],
  };

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.http.request(environment.apiUrl + 'partner?partner_type=client')
      .subscribe(res => {
        const data = res.json();
        this.clients = [];
        for (let i in data.data) {
          let item = data.data[i];
          this.clients.push(item['company']);
          this.client_map[item['company']] = item['id_partner'];
        }
        this.http.request(environment.apiUrl + 'dashboard?partner_type=client')
            .subscribe(res2 => {
              const data2 = res2.json();
              this.month = data2.data.months;
              this.clients_revenus = data2.data.partner_stats;
              this.compute_total();
            });
      });

    this.http.request(environment.apiUrl + 'partner?partner_type=supplier')
      .subscribe(res => {
        const data = res.json();
        this.suppliers = [];
        for (let i in data.data) {
          let item = data.data[i];
          this.suppliers.push(item['company']);
          this.supplier_map[item['company']] = item['id_partner'];
        }
         this.http.request(environment.apiUrl + 'dashboard?partner_type=supplier')
            .subscribe(res2 => {
              const data2 = res2.json();
              this.month = data2.data.months;
              this.suppliers_revenus = data2.data.partner_stats;
              this.compute_total();
            });
      });
  }


  private compute_total(): void {
    let i;
    for (i in this.clients) {
      const client = this.clients[i];
      let total_client = 0;
      let j;
      const client_revenues = this.clients_revenus[this.client_map[client]];
      for (j in client_revenues) {
        const r = client_revenues[j];
        total_client = total_client + r;
      }
      this.total[client] =  Math.round(total_client * 100) / 100;
    }
    for (i in this.suppliers) {
      const supplier = this.suppliers[i];
      let total_supplier = 0;
      let j;
      const supplier_revenues = this.suppliers_revenus[this.supplier_map[supplier]];
      for (j in supplier_revenues) {
        const r = supplier_revenues[j];
        total_supplier = total_supplier + r;
      }

      this.total[supplier] = Math.round(total_supplier * 100) / 100;
    }
  }
}
