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
        name: "",
        marker: { size: 20, color: "red" },
      },
    ],
    layout: { title: "Chances" },
  };

  migrateDataPoints() {
    this.xNums = this.chanceStepperComponent.getXVals();
    this.yNums = this.chanceStepperComponent.getYVals();
    this.graph.data = [
      {
        x: this.xNums,
        y: this.yNums,
        mode: "markers",
        name: "Others",
        marker: { size: 20, color: "green" },
      },
    ];
    this.addUserPoint();
  }


  addUserPoint() {
    var xAdd = this.chanceStepperComponent.getUserX();
    var yAdd = this.chanceStepperComponent.getUserY();
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
}
