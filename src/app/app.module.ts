import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainFormOrderComponent } from './main-form-order/main-form-order.component';
import { NewrelationComponent } from './newrelation/newrelation.component';
import { RecaporderComponent } from './recaporder/recaporder.component';
import {SelectModule} from 'ng2-select';
import { SignaletiqueComponent } from './signaletique/signaletique.component';
import { IdentiteComponent } from './signaletique/identite/identite.component';
import { ProformaComponent } from './signaletique/proforma/proforma.component';
import { ExpeditionComponent } from './signaletique/expedition/expedition.component';
import { ReglementComponent } from './signaletique/reglement/reglement.component';
import { PrePaiementComponent } from './signaletique/pre-paiement/pre-paiement.component';
import { FactureComponent } from './signaletique/facture/facture.component';
import {UiSwitchModule} from "ngx-toggle-switch";
import { ModuleComponent } from './signaletique/module/module.component';
import { TableauComponent } from './tableau/tableau.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainFormOrderComponent,
    NewrelationComponent,
    RecaporderComponent,
    SignaletiqueComponent,
    IdentiteComponent,
    ProformaComponent,
    ExpeditionComponent,
    ReglementComponent,
    PrePaiementComponent,
    FactureComponent,
    ModuleComponent,
    TableauComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SelectModule,
    UiSwitchModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
