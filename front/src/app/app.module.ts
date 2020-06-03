import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule, Http } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { CardsComponent } from "./cards/cards.component";
import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AppComponent, CardsComponent],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    NoopAnimationsModule,
    MatExpansionModule,
    FormsModule,
    Ng2SearchPipeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
