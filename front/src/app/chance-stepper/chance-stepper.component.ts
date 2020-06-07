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

  avgScore: number;
  avgAgeRaw: number;
  avgAgeMos: number;
  avgAgeYrs: number;

  // Score
  medianScore: number;
  q1Score: number;
  q3Score: number;
  stDevScore: number;

  // Acct age
  medianAcctRaw: number;
  q1AcctRaw: number;
  q3AcctRaw: number;
  stDevAcctRaw: number;

  medianAcctYrs: number;
  q1AcctYrs: number;
  q3AcctYrs: number;
  stDevAcctYrs: number;

  medianAcctMos: number;
  q1AcctMos: number;
  q3AcctMos: number;
  stDevAcctMos: number;

  userScorePercentile: number;
  userLengthPercentile: number;

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
      },
    },
    config: {
      displayModeBar: false,
    }

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
    this.calculateStatistics();

  }

  calculateStatistics() {
    this.avgScore = Math.round(this.Array_Average(this.yNums));
    this.avgAgeRaw = this.Array_Average(this.xNums);
    this.avgAgeYrs = Math.round(this.avgAgeRaw / 12);
    this.avgAgeMos = Math.round(this.avgAgeRaw % 12);

    this.medianScore = Math.round(this.Quartile_50(this.yNums));
    this.medianAcctRaw = Math.round(this.Quartile_50(this.xNums));

    this.q1Score = Math.round(this.Quartile_25(this.yNums));
    this.q1AcctRaw = Math.round(this.Quartile_25(this.xNums));

    this.q3Score = Math.round(this.Quartile_75(this.yNums));
    this.q3AcctRaw = Math.round(this.Quartile_75(this.xNums));

    this.stDevScore = Math.round(this.Array_Stdev(this.yNums));
    this.stDevAcctRaw = Math.round(this.Array_Stdev(this.xNums));

    this.medianAcctYrs = Math.round(this.medianAcctRaw / 12);
    this.medianAcctMos = Math.round(this.medianAcctRaw % 12);

    this.q1AcctYrs = Math.round(this.q1AcctRaw / 12);
    this.q1AcctMos = Math.round(this.q1AcctRaw % 12);

    this.q3AcctYrs = Math.round(this.q3AcctRaw / 12);
    this.q3AcctMos = Math.round(this.q3AcctRaw % 12);

    this.stDevAcctYrs = Math.round(this.stDevAcctRaw / 12);
    this.stDevAcctMos = Math.round(this.stDevAcctRaw % 12);

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
    this.userScorePercentile = Math.round(this.percentile(this.yNums, yAdd));
    this.userLengthPercentile = Math.round(this.percentile(this.xNums, xAdd));

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

  Median(data) {
    return this.Quartile_50(data);
  }

  Quartile_25(data) {
    return this.Quartile(data, 0.25);
  }

  Quartile_50(data) {
    return this.Quartile(data, 0.5);
  }

  Quartile_75(data) {
    return this.Quartile(data, 0.75);
  }

  Quartile(data, q) {
    data = this.Array_Sort_Numbers(data);
    var pos = ((data.length) - 1) * q;
    var base = Math.floor(pos);
    var rest = pos - base;
    if ((data[base + 1] !== undefined)) {
      return data[base] + rest * (data[base + 1] - data[base]);
    } else {
      return data[base];
    }
  }

  Array_Sort_Numbers(inputarray) {
    return inputarray.sort((a, b) => {
      return a - b;
    });
  }

  Array_Sum(t) {
    return t.reduce((a, b) => { return a + b; }, 0);
  }

  Array_Average(data) {
    return this.Array_Sum(data) / data.length;
  }

  Array_Stdev(tab) {
    var i, j, total = 0, mean = 0, diffSqredArr = [];
    for (i = 0; i < tab.length; i += 1) {
      total += tab[i];
    }
    mean = total / tab.length;
    for (j = 0; j < tab.length; j += 1) {
      diffSqredArr.push(Math.pow((tab[j] - mean), 2));
    }
    return (Math.sqrt(diffSqredArr.reduce((firstEl, nextEl) => {
      return firstEl + nextEl;
    }) / tab.length));
  }

  percentile(arr, val) {
    return (100 * arr.reduce((acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0)) / arr.length;
  }

}

