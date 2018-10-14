import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {Http} from '@angular/http';

@Component({
  selector: 'app-newrelation',
  templateUrl: './newrelation.component.html',
  styleUrls: ['./newrelation.component.scss']
})
export class NewrelationComponent implements OnInit {

  private createNewPartner = false;
  public newPartner: any;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.newPartner = {
      'type': '',
      'company': '',
    };
  }

  private onCreateNewPartner() {
    this.createNewPartner = !this.createNewPartner;
  }

  onSubmit(value) {
    this.http.post(environment.apiUrl + 'partner', this.newPartner).subscribe();
  }
}
