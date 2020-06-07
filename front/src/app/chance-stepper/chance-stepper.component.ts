import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from "../card.service";
import { Card } from "../card";
import { NonzeroEntryPipe } from '../nonzero-entry.pipe';


@Component({
  selector: 'app-chance-stepper',
  templateUrl: './chance-stepper.component.html',
  styleUrls: ['./chance-stepper.component.css'],
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
  xNums: number[]; // length of account
  yNums: number[]; // credit score

  constructor(private _formBuilder: FormBuilder, private cardService: CardService) {
    this.cardService.getCards().subscribe((cards) => {
      this.dbRecords = cards;
    });
    this.xNums = new Array();
    this.yNums = new Array();
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

  public graph = {
    data: [
      {
        x: this.xNums,
        y: this.yNums,
        mode: 'markers',
        name: "",
        marker: { size: 20, color: "red" },
      },
    ],
    layout: { 
      title: "Chances",
      xaxis: {
        title: 'Oldest Account Age (Total months)',
      },
      yaxis: {
        title: 'Credit Score',
      }
    },
  };

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
        this.yNums.push(this.dbRecords[i].creditScore);
        var totalLength = this.dbRecords[i].acctAgeYrs * 12 + this.dbRecords[i].acctAgeMos;
        this.xNums.push(totalLength);
      }
    }
    this.migrateDataPoints();
  }


  sendUserData() {
    return this.addUserPoint(this.userDataGroup.get('yrCtrl').value * 12 + this.userDataGroup.get('moCtrl').value, Number(this.userDataGroup.get('scoreCtrl').value));
  }


  migrateDataPoints() {
    this.graph.data = [
      {
        x: this.xNums,
        y: this.yNums,
        mode: "markers",
        name: "Others",
        marker: { size: 20, color: "green" },
      },
    ];
  }

  private addUserPoint(xAdd: number, yAdd: number) {
    this.graph.data.push(
      {
        x: [xAdd],
        y: [yAdd],
        mode: "markers",
        name: "You",
        marker: { size: 20, color: "red" },
      },
    );
  }

  resetGraphData() {
    this.xNums = [];
    this.yNums = [];
    this.graph.data = [
      {
        x: [],
        y: [],
        mode: 'markers',
        name: "",
        marker: { size: 20, color: "red" },
      },
    ];
  }
}

