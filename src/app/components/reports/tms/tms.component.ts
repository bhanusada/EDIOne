import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { ServerService } from '../../../services/server.service';

@Component({
  selector: 'app-tms',
  templateUrl: './tms.component.html',
  styleUrls: ['./tms.component.scss']
})
export class TmsComponent implements OnInit {

    @ViewChild('tmsusChart') tmsusChart: BaseChartDirective;
    @ViewChild('tmscaChart') tmscaChart: BaseChartDirective;

    public lineChartData = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', fill: false },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B', fill: false },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C', fill: false },
        { data: [55, 20, 40, 50, 20, 10, 78], label: 'Series D', fill: false },
        { data: [62, 45, 12, 87, 45, 76, 23], label: 'Series E', fill: false }
    ];
    public lineChartType = 'line';
    public lineChartLegend = true;
    public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions = {
        responsive: true,
        legend: {
            display: true,
            position: 'bottom'
        },
        tooltips: {
            mode: 'point'
        }
    };

    public top1ChartColors = [
        { // blue
            backgroundColor: 'rgba(54, 162, 235,0.2)',
            borderColor: 'rgba(54, 162, 235,1)',
            pointBackgroundColor: 'rgba(54, 162, 235,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235,1)'
        }
    ];
    public top2ChartColors = [
        { // red
            backgroundColor: 'rgba(255, 99, 132,0.2)',
            borderColor: 'rgba(255, 99, 132,1)',
            pointBackgroundColor: 'rgba(255, 99, 132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132,0.8)'
        }
    ];
    public top3ChartColors = [
        { // yellow
            backgroundColor: 'rgba(255, 206, 86,0.2)',
            borderColor: 'rgba(255, 206, 86,1)',
            pointBackgroundColor: 'rgba(255, 206, 86,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 206, 86,0.8)'
        }
    ];


    constructor(private serverService: ServerService) { }

    ngOnInit() {
        this.refresh();
        this.sortMetrics();
    }

    public refresh() {
        this.serverService.tmsRefresh().subscribe(message => {
            console.log(message);
            this.sortMetrics();
        });
    }

    public sortMetrics() {
        this.lineChartData.sort( (a, b) =>
            a.data.reduce( (acc, cur) => acc = acc + cur) - b.data.reduce( (acc, cur) => acc = acc + cur)
        )
    }

    public chartClicked(e: any): void {
        console.log(e);
        if (e.active.length > 0) {
            const chartElement = e.active[0]._chart.getElementAtEvent(event);
            console.log(chartElement[0]._model.datasetLabel)
        }
    }

    public chartHovered(e: any): void {
        console.log(e);
    }


}
