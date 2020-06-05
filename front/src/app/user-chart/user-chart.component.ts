import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user-chart",
  templateUrl: "./user-chart.component.html",
  styleUrls: ["./user-chart.component.css"],
})
export class UserChartComponent {
  constructor() { }

  public graph = {
    data: [
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "points",
        marker: { color: "blue" },
      },
    ],
    layout: { title: "Chances" },
  };

  addChartPoint() {
    this.graph.data = [
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: "scatter",
        mode: "points",
        marker: { color: "blue" },
      },
    ];
  }
}
