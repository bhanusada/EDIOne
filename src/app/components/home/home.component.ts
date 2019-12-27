 import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
 import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild('canvasjs') testchart: ElementRef;

    public prcLineChartData = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Queue Depth', fill: false },
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Long Running Threads', fill: false },
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Non Business Failures', fill: false },
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'DotCom Failures', fill: false }
    ];
    public prdLineChartData = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Queue Depth', fill: false },
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Long Running Threads', fill: false },
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Non Business Failures', fill: false }
    ];
    public preLineChartData = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Queue Depth', fill: false },
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Long Running Threads', fill: false },
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Non Business Failures', fill: false }
    ];
    public lineChartType = 'bar';
    public lineChartLegend = true;
    public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions = {
        scales: {
            xAxes: [{
                        gridLines: {
                            display: false
                        }
                    }],
            yAxes: [{
                        gridLines: {
                            display: true
                        }
                    }]
            },
        responsive: true,
        tooltips: {
            mode: 'point'
        }
    };

    public chartColors: Array<any> = [
        [{ // red
            backgroundColor: 'rgba(255, 99, 132,0.5)',
            borderColor: 'rgba(255, 99, 132,1)',
            pointBackgroundColor: 'rgba(255, 99, 132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132,0.8)'
        }], [{ // blue
            backgroundColor: 'rgba(54, 162, 235,0.5)',
            borderColor: 'rgba(54, 162, 235,1)',
            pointBackgroundColor: 'rgba(54, 162, 235,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235,1)'
        }], [{ // green
            backgroundColor: 'rgba(75, 192, 192,0.5)',
            borderColor: 'rgba(75, 192, 192,1)',
            pointBackgroundColor: 'rgba(75, 192, 192,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192,0.8)'
        }], [{ // yellow
            backgroundColor: 'rgba(255, 206, 86,0.5)',
            borderColor: 'rgba(255, 206, 86,1)',
            pointBackgroundColor: 'rgba(255, 206, 86,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 206, 86,0.8)'
        }] ];

  constructor() { }

  ngOnInit() {
    const ctx = this.testchart.nativeElement.getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: this.lineChartLabels,
            datasets: [{
                data: this.prcLineChartData[0].data,
                fill: true,
                label: this.prcLineChartData[0].label
            }, {
                data: this.prcLineChartData[1].data,
                fill: true,
                label: this.prcLineChartData[1].label
            }, {
                data: this.prcLineChartData[2].data,
                fill: true,
                label: this.prcLineChartData[2].label
            }]
        },
        option: {
            responsive: true,
            title: {
                display: true,
                text: 'test'
            }
        }
    });


  }

}
