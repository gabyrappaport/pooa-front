import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-newrelation',
  templateUrl: './newrelation.component.html',
  styleUrls: ['./newrelation.component.scss']
})
export class NewrelationComponent implements OnInit {

  new_partner_form: FormGroup;

  private createNewPartner = false;
  public suppliers_array = [];
  public clients_array = [];
  public partner_data = {};

  constructor(private http: Http, fb: FormBuilder) {
    this.new_partner_form = fb.group({
      'partner_type': '',
      'company': '',
    });
  }

  ngOnInit() {
    this.update_lists();
  }

  private update_lists(): void {
    this.http.request(environment.apiUrl + 'partner?partner_type=client')
      .subscribe(res => {
        const data = res.json();
        this.clients_array = [];
        for (const i in data.data) {
          this.clients_array.push(data.data[i]['id_partner']);
          this.partner_data[data.data[i]['id_partner']] =
            {'company': data.data[i]['company'], 'unpaid': 0, 'undelivered': 0};
        }

        this.http.request(environment.apiUrl + 'partner?partner_type=supplier')
          .subscribe(res1 => {
            const supplier_data = res1.json();
            this.suppliers_array = [];
            for (const i in supplier_data.data) {
              this.suppliers_array.push(supplier_data.data[i]['id_partner']);
              this.partner_data[supplier_data.data[i]['id_partner']] =
                {'company': supplier_data.data[i]['company'], 'unpaid': 0, 'undelivered': 0};
            }
            this.http.request(environment.apiUrl + 'partner?unpaid=True')
              .subscribe(res2 => {
                const unpaid_data = res2.json();
                console.log(unpaid_data);
                for (const i in unpaid_data.data) {
                  this.partner_data[unpaid_data.data[i]['id_partner']]['unpaid'] = unpaid_data.data[i]['unpaid'];
                }
              });

            this.http.request(environment.apiUrl + 'partner?undelivered=True')
              .subscribe(res3 => {
                const undelivered_data = res3.json();
                for (const i in undelivered_data.data) {
                  this.partner_data[undelivered_data.data[i]['id_partner']]['undelivered'] = undelivered_data.data[i]['undelivered'];
                }
              });
          });

      });
  }

  private onCreateNewPartner() {
    this.createNewPartner = !this.createNewPartner;
  }

  onSubmit(value) {
    console.log(value);
    this.http.post(environment.apiUrl + 'partner', value)
      .subscribe(res => {
        console.log(res);
        this.update_lists();
      });
  }
}
