import { Component, OnInit } from "@angular/core";
import { ChanceStepperComponent } from "../chance-stepper/chance-stepper.component";
import { Card } from '../card';
import { CardService } from '../card.service';

@Component({
  selector: "app-user-chart",
  templateUrl: "./user-chart.component.html",
  styleUrls: ["./user-chart.component.css"],
})
export class UserChartComponent {
  xNums: number[];
  yNums: number[];

  constructor(private cardService: CardService) {
    this.xNums = new Array();
    this.yNums = new Array();
  }

  public graph = {
    data: [
      {
        x: [],
        y: [],
        mode: 'markers',
        name: "",
        marker: { size: 20, color: "red" },
      },
    ],
    layout: { title: "Chances" },
  };

  migrateDataPoints(xVals: number[], yVals: number[]) {
    this.xNums = xVals;
    this.yNums = yVals;
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

  addUserPoint(xAdd: number, yAdd: number) {
   
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

  resetGraphData(){

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
