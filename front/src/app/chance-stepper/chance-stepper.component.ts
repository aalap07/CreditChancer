import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from "../card.service";
import { UserChartComponent } from "../user-chart/user-chart.component";
import { Card } from "../card";
import { NonzeroEntryPipe } from '../nonzero-entry.pipe';


@Component({
  selector: 'app-chance-stepper',
  templateUrl: './chance-stepper.component.html',
  styleUrls: ['./chance-stepper.component.css'],
  providers: [UserChartComponent]
})
export class ChanceStepperComponent implements OnInit {
  cardGroup: FormGroup;
  selectorGroup: FormGroup;
  userDataGroup: FormGroup;
  isEditable = false;
  apiCards: String[];
  apiCard: string;
  chanceSearch: string;
  selectedCard: string;

  dbRecords: Card[];
  xVals: number[]; // length of account
  yVals: number[]; // credit score

  constructor(private _formBuilder: FormBuilder, private cardService: CardService, private userChartComponent: UserChartComponent) {
    this.cardService.getCards().subscribe((cards) => {
      this.dbRecords = cards;
    });
    this.xVals = new Array();
    this.yVals = new Array();
  }

  ngOnInit() {
    this.cardGroup = this._formBuilder.group({
      cardSearchCtrl: ['', Validators.required]
    });
    this.selectorGroup = this._formBuilder.group({
      selectedEntry: ['', Validators.required]
    });
    this.userDataGroup = this._formBuilder.group({
      scoreCtrl: ['', Validators.required],
      yrCtrl: ['', Validators.required],
      moCtrl: ['', Validators.required]
    });
  }

  fetchApiCards() {
    this.cardService.getApiCards(this.chanceSearch).subscribe((apiCards) => {
      var filtered = new Array();
      for (var i = 0; i < apiCards.results.length; i++) {
        filtered.push(apiCards.results[i].title);
      }
      this.apiCards = filtered;
    });
    return this.apiCards;
  }

  createDataArray() {
    for (var i = 0; i < this.dbRecords.length; i++) {
      if (this.dbRecords[i].name == this.selectorGroup.get('selectedEntry').value) {
        this.yVals.push(this.dbRecords[i].creditScore);
        var totalLength = this.dbRecords[i].acctAgeYrs * 12 + this.dbRecords[i].acctAgeMos;
        this.xVals.push(totalLength);
      }
    }
    this.sendCardData();
  }

  sendCardData(){
    return this.userChartComponent.migrateDataPoints(this.xVals, this.yVals);
  }

  sendUserData(){
    return this.userChartComponent.addUserPoint(this.userDataGroup.get('yrCtrl').value * 12 + this.userDataGroup.get('moCtrl').value, Number(this.userDataGroup.get('scoreCtrl').value));
  }

  resetPlot(){
    return this.userChartComponent.resetGraphData();
  }

}
