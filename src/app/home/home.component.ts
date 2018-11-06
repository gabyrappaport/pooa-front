import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menus: Array<Object>
  constructor() {
    this.menus = [
      {
        title: 'Nouvel Ordre',
        icon: 'shipped',
        link:'neworder'
      },
      {
        title: 'Ordres',
        icon: 'clipboards',
        link:'recaporder'
      },
      {
        title: 'Partenaires',
        icon: 'user',
        link:'newrelation'
      },
       {
        title: 'Revenus',
        icon: 'clipboards-1',
        link:'revenus'
      },
    ];
  }

  ngOnInit() {
  }
}
