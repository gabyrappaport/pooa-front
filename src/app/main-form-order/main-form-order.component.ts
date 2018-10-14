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
  public clients: Array<string>;
  public fournisseurs: Array<string>;
  public mode: boolean = false;
  public montant: number = 0;
  public commission: number = 0;
  public expected_delivery_date: any;
  private valueClient: any;
  private valueFournisseur: any;

  constructor(fb: FormBuilder, private http: Http, private router: Router) {
    this.myForm = fb.group({
      'paymentMode': ['LC'],
      'TT': [''],
      'DP': [''],
      'Ldips': ['OK'],
      'sOff': ['OK'],
      'approSS': ['OK'],
      'approSS2H': ['SSAttF']
    });
  }

  ngOnInit() {
    this.http.request(environment.apiUrl + 'contact?type=client')
      .subscribe(res => {
        const data = res.json();
        this.clients = data.contacts.map(a => a.name);
      });

    this.http.request(environment.apiUrl + 'contact?type=fournisseur')
      .subscribe(res => {
        const data = res.json();
        this.fournisseurs = data.contacts.map(a => a.name);
        console.log(this.fournisseurs);
      });

    this.products = [
      {
        'id': 1,
        'ref': '',
        'support': '',
        'commission': 0,
        'colori': '',
        'quantite': '',
        'prix': ''
      }];
  }

  addNewChoice() {
    const newItemNo = Math.max.apply(Math, this.products.map(function (o) {
      return o.id;
    })) + 1;
    this.products.push({
      'id': 1,
      'ref': '',
      'support': '',
      'commission': 0,
      'colori': '',
      'quantite': '',
      'prix': ''
    });
  }

  removeChoice(productId: number) {
    const index = this.products.indexOf(this.products.find(x => x.id === productId));
    this.products.splice(index, 1);
  }

  updateMontant(): void {
    let montant = 0;
    for (var i in this.products) {
      const produit = this.products[i];
      montant = montant + produit.prix * produit.quantite;
    }
    this.montant = montant;
  }

  onSubmit(value) {
    if (value.incoterm == 'other') {
      value.incoterm = value.incotermOther;
    }
    if (value.currency == 'other') {
      value.currency = value.currencyOther;
    }
    if (value.paymentMode == 'TT + DP') {
      value.paymentMode = value.TT + '% TT + ' + value.DP + '% DP';
    }
    delete value.incotermOther;
    delete value.currencyOther;
    delete value.TT;
    delete value.DP;
    const prod = {
      'totalPrice': this.montant,
      'products': this.products,
      'fournisseur': this.valueFournisseur.text,
      'client': this.valueClient.text,
    };
    const form = Object.assign({}, value, prod);
    console.log(form);
    this.http.post(environment.apiUrl + 'ordre', form).subscribe();
    this.router.navigate(['/recaporder']);
  }

  public modeTrue(value: any): void {
    this.mode = true;
  }

  public modeFalse(value: any): void {
    this.mode = false;
  }

  public refreshClient(value: any): void {
    this.valueClient = value;
  }

  public refreshFournisseur(value: any): void {
    this.valueFournisseur = value;
  }

}
