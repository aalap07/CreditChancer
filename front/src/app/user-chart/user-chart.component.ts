import { Component, OnInit } from "@angular/core";
import {ChanceStepperComponent} from "../chance-stepper/chance-stepper.component";
import { Card } from '../card';
import {CardService} from '../card.service';

@Component({
  selector: "app-user-chart",
  templateUrl: "./user-chart.component.html",
  styleUrls: ["./user-chart.component.css"],
})
export class UserChartComponent {
  xNums: number[];
  yNums: number[];


  constructor(private chanceStepperComponent: ChanceStepperComponent, private cardService: CardService) { 
    this.xNums = new Array();
    this.yNums = new Array();
    // this.migrateDataPoints();

  }

  public graph = {
    data: [
      {
        x: [],
        y: [],
        mode: 'markers',
        marker: { size: 20 },
      },
    ],
    layout: { title: "Chances"},
  };

  migrateDataPoints(){
    this.xNums = this.chanceStepperComponent.getXVals();
    this.yNums = this.chanceStepperComponent.getYVals();
    this.graph.data = [
      {
        x: this.xNums,
        y: this.yNums,
        mode: "markers",
        marker: { size: 20 },
      },
    ];
  }


  addUserPoint() {
    this.graph.data = [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        mode: "markers",
        marker: { size: 20 },
      },
    ];
  }
}
