import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http, RequestOptions} from '@angular/http';
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
          this.clients_array.push(data.data[i]['company']);
        }
      });

    this.http.request(environment.apiUrl + 'partner?partner_type=supplier')
      .subscribe(res => {
        const data = res.json();
        this.suppliers_array = [];
        for (const i in data.data) {
          this.suppliers_array.push(data.data[i]['company']);
        }
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
