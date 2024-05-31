import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

import * as Plotly from 'plotly.js-dist-min';

@Component({
  
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  ngOnInit() {
    this.initCharts();
  }

  private initCharts(): void {
    const data1 = [{
      values: [18, 26, 55], // Example values
      labels: ['Residential', 'Non-Residential', 'Utility'], // Example labels
      type: 'pie' as 'pie'
    }];

    const data2 = [{
      values: [30, 20, 50], // Example values
      labels: ['Category A', 'Category B', 'Category C'], // Example labels
      type: 'pie' as 'pie'
    }];

    const data3 = [{
      values: [10, 40, 50], // Example values
      labels: ['Segment X', 'Segment Y', 'Segment Z'], // Example labels
      type: 'pie' as 'pie'
    }];
    
    const data4 = [{
      values: [30, 20, 50], // Example values
      labels: ['Category A', 'Category B', 'Category C'], // Example labels
      type: 'pie' as 'pie'
    }];

    const data5 = [{
      values: [10, 40, 50], // Example values
      labels: ['Segment X', 'Segment Y', 'Segment Z'], // Example labels
      type: 'pie' as 'pie'
    }];
    
    const data6 = [{
      values: [30, 20, 50], // Example values
      labels: ['Category A', 'Category B', 'Category C'], // Example labels
      type: 'pie' as 'pie'
    }];

    const data7 = [{
      values: [10, 40, 50], // Example values
      labels: ['Segment X', 'Segment Y', 'Segment Z'], // Example labels
      type: 'pie' as 'pie'
    }];
    const data8 = [{
      values: [10, 40, 50], // Example values
      labels: ['Segment X', 'Segment Y', 'Segment Z'], // Example labels
      type: 'pie' as 'pie'
    }];

    const barData1 = [{
      x: ['Category A', 'Category B', 'Category C'], // Example categories
      y: [20, 14, 23], // Example values
      type: 'bar' as 'bar'
    }];
    const barData2 = [{
      x: ['Segment X', 'Segment Y', 'Segment Z'], // Example categories
      y: [20, 14, 23], // Example values
      type: 'bar' as 'bar'
    }];
    // const barData3 = [{
    //   x: ['Male', 'Female'], // Example categories
    //   y: [20, 14], // Example values
    //   type: 'bar' as 'bar'
    // }];
    const lineData1 = [{
      x: ['January', 'February', 'March'], // Example categories
      y: [10, 15, 13], // Example values
      type: 'scatter' as 'scatter',
      mode: 'lines+markers' as 'lines+markers',
      name: 'Line 1'
    }];
    const lineData2 = [{
      x: ['April', 'May', 'June'], // Example categories
      y: [16, 5, 11], // Example values
      type: 'scatter' as 'scatter',
      mode: 'lines+markers' as 'lines+markers',
      name: 'Line 2'
    }];
    // const lineData3 = [{
    //   x: ['July', 'August', 'September'], // Example categories
    //   y: [12, 9, 15], // Example values
    //   type: 'scatter' as 'scatter',
    //   mode: 'lines+markers' as 'lines+markers',
    //   name: 'Line 3'
    // }];
    const pielayout = {
      height: 350,
      width: 450,
      font: {
        size: 16 // Increase the font size
      },
      title: {
        font: {
          size: 24 // Increase the title font size
        }
      },
      legend: {
        font: {
          size: 16 // Increase the legend font size
        }
      },
      paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background
      plot_bgcolor: 'rgba(0,0,0,0)', // Transparent background
    };
    const layout = {
      height: 350,
      width: 450,
      font: {
        size: 16 // Increase the font size
      },
      title: {
        font: {
          size: 24 // Increase the title font size
        }
      },
      legend: {
        font: {
          size: 16 // Increase the legend font size
        }
      }
    };

    Plotly.newPlot('pieChart1', data1, pielayout);
    Plotly.newPlot('pieChart2', data2, pielayout);
    Plotly.newPlot('pieChart3', data3, pielayout);
    Plotly.newPlot('pieChart4', data4, pielayout);
    Plotly.newPlot('pieChart5', data5, pielayout);
    Plotly.newPlot('pieChart6', data6, pielayout);
    Plotly.newPlot('pieChart7', data7, pielayout);
    Plotly.newPlot('pieChart8', data8, pielayout);
    Plotly.newPlot('barChart1', barData1, layout);
    Plotly.newPlot('barChart2', barData2, layout);
    // Plotly.newPlot('barChart3', barData3, layout);
    Plotly.newPlot('lineChart1', lineData1, layout);
    Plotly.newPlot('lineChart2', lineData2, layout);
    // Plotly.newPlot('lineChart3', lineData3, layout);
  }
}