import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recaporder',
  templateUrl: './recaporder.component.html',
  styleUrls: ['./recaporder.component.scss']

})
export class RecaporderComponent implements OnInit {

  public fournisseurs: Array<string>;

  public clients: Array<string>;

  public orders: any;
  public selectedOrders: any;
  private selectedFournisseurs: any = [];
  private selectedClients: any = [];
  private disabled = false;
  private select = true;

  constructor(private http: Http, private router:Router) {
  }

  ngOnInit() {
    this.http.request(environment.apiUrl + 'ordre/all')
      .subscribe(res => {
        const data = res.json();
        this.orders = data.orders;
        console.log(this.orders);
        this.selectedOrders = this.orders;
      });

    this.http.request(environment.apiUrl + 'contact?type=client')
      .subscribe(res => {
        const data = res.json();
        this.clients = data.contacts.map(a => a.name);
      });

    this.http.request(environment.apiUrl + 'contact?type=fournisseur')
      .subscribe(res => {
        const data = res.json();
        this.fournisseurs = data.contacts.map(a => a.name);
      });
  }


  private _disabledV = '0';

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    console.log('Selected value is: ', value);
  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);
  }

  public refreshFournisseur(value: any): void {
    this.selectedFournisseurs = value;
    this.selectedOrders = this.orders.slice();
    this.update();
  }

  public refreshClient(value: any): void {
    this.selectedClients = value;
    this.selectedOrders = this.orders.slice();
    this.update();
  }

  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.text;
      }).join(',');
  }

  private update() {
    if (this.selectedFournisseurs.length !== 0) {
      this.selectedOrders = this.selectedOrders.filter(order => this.selectedFournisseurs.find(x => x.text === order.supplier));
    }
    if (this.selectedClients.length !== 0) {
      this.selectedOrders = this.selectedOrders.filter(order => this.selectedClients.find(x => x.text === order.client));
    }
  }

  private onSelect() {
    this.select = !this.select;
  }

  private changePage(id) {
    console.log("HEYYYYYY");
    this.router.navigate(['/signaletique'], { queryParams: { id: id } });
  }


}
