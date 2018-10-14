import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { HomeComponent }   from './home/home.component';
import { MainFormOrderComponent } from './main-form-order/main-form-order.component';
import {NewrelationComponent} from "./newrelation/newrelation.component";
import {RecaporderComponent} from "./recaporder/recaporder.component";
import {SignaletiqueComponent} from "./signaletique/signaletique.component";
import {TableauComponent} from "./tableau/tableau.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'neworder', component: MainFormOrderComponent },
  { path: 'newrelation', component: NewrelationComponent },
  { path: 'recaporder', component: RecaporderComponent },
  { path: 'signaletique', component: SignaletiqueComponent },
  { path: 'tableau', component: TableauComponent },
  ];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

