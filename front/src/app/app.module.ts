import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { CardsComponent } from "./cards/cards.component";
import { CommonModule } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, CardsComponent],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    NoopAnimationsModule,
    MatExpansionModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
