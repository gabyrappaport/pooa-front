import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai'];
  public clients = ['client_1', 'client_2', 'client_3'];
  public clients_revenus = {
    'client_1': [12, 45, 0, 3, 2],
    'client_3': [4, 5, 0, 45, 6],
    'client_2': [2, 4, 10, 54, 4],
  };
  public total = {};
  public suppliers = ['client_1', 'client_2', 'client_3'];
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
        console.log(res);
        this.clients = [];
        for (let i in data.data) {
          this.clients.push(data.data[i]['company']);
        }
      });

    this.http.request(environment.apiUrl + 'partner?partner_type=supplier')
      .subscribe(res => {
        const data = res.json();
        this.suppliers = [];
        for (let i in data.data) {
          this.suppliers.push(data.data[i]['company']);
        }
      });
    this.compute_total();
  }

  private compute_total(): void {
    let i;
    for (i in this.clients) {
      const client = this.clients[i];
      let total_client = 0;
      let j;
      const client_revenues = this.clients_revenus[client];
      for (j in client_revenues) {
        const r = client_revenues[j];
        total_client = total_client + r;
      }
      this.total[client] = total_client;
    }
     for (i in this.suppliers) {
      const supplier = this.suppliers[i];
      let total_supplier = 0;
      let j;
      const supplier_revenues = this.suppliers_revenus[supplier];
      for (j in supplier_revenues) {
        const r = supplier_revenues[j];
        total_supplier = total_supplier + r;
      }
      this.total[supplier] = total_supplier;
    }
    console.log(this.total);
  }
}
