import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule, Http } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { CardsComponent } from "./cards/cards.component";
import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { UserChartComponent } from './user-chart/user-chart.component';
import { ContributeComponent } from './contribute/contribute.component';
import {MatStepperModule, MatStep} from '@angular/material/stepper';
import { ChanceStepperComponent } from './chance-stepper/chance-stepper.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [AppComponent, CardsComponent, UserChartComponent, ContributeComponent, ChanceStepperComponent],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    NoopAnimationsModule,
    MatExpansionModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    PlotlyModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
