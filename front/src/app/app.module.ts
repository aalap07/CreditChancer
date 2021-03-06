import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
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
import { ContributeComponent } from './contribute/contribute.component';
import { MatStepperModule, MatStep } from '@angular/material/stepper';
import { ChanceStepperComponent } from './chance-stepper/chance-stepper.component';
import { MatRadioModule } from '@angular/material/radio';
import { NonzeroEntryPipe } from './nonzero-entry.pipe';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [AppComponent, CardsComponent, ContributeComponent, ChanceStepperComponent, NonzeroEntryPipe],
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
    ReactiveFormsModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }
