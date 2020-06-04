import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-chart',
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css']
})
export class UserChartComponent {
  public graph = {
    data: [
        { x: [1, 2, 3], y: [2, 6, 3], type: 'scatter', mode: 'points', marker: {color: 'red'} },
    ],
    layout: {width: 500, height: 300, title: 'Chances'}
};


}
