import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Dropdown } from 'ux-angular-styleguide/release/components/dropdowns';

import { ServerService } from '../../../services/server.service';

@Component({
    selector: 'app-alldocstype',
    templateUrl: './alldocstype.component.html',
    styleUrls: ['./alldocstype.component.scss']
})
export class AlldocstypeComponent implements OnInit {

    @ViewChild('alldocs') alldocsChart: BaseChartDirective;
    @ViewChild('dropdowndir') dropdowndir: Dropdown;

    public alldocsChartData = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'PRC_OB', fill: false },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'PRC_IB', fill: false },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'PRD_OB', fill: false },
        { data: [23, 34, 21, 76, 23, 12, 77], label: 'PRD_IB', fill: false },
        { data: [32, 45, 67, 23, 87, 32, 65], label: 'PRE_OB', fill: false },
        { data: [45, 23, 67, 37, 24, 87, 12], label: 'PRE_IB', fill: false }
    ];
    public alldocsChartDataTemp = [];
    public alldocsChartType = 'line';
    public alldocsChartLegend = true;
    public alldocsChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public alldocsChartOptions = {
        fill: false,
        responsive: true,
        legend: {
            display: true,
        }
    };

    public alldocsChartColors: Array<any> = [
        { // red
            backgroundColor: 'rgba(255, 99, 132,0.2)',
            borderColor: 'rgba(255, 99, 132,1)',
            pointBackgroundColor: 'rgba(255, 99, 132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132,0.8)'
        }, { // blue
            backgroundColor: 'rgba(54, 162, 235,0.2)',
            borderColor: 'rgba(54, 162, 235,1)',
            pointBackgroundColor: 'rgba(54, 162, 235,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235,1)'
        }, { // green
            backgroundColor: 'rgba(75, 192, 192,0.2)',
            borderColor: 'rgba(75, 192, 192,1)',
            pointBackgroundColor: 'rgba(75, 192, 192,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192,0.8)'
        }, { // yellow
            backgroundColor: 'rgba(255, 206, 86,0.2)',
            borderColor: 'rgba(255, 206, 86,1)',
            pointBackgroundColor: 'rgba(255, 206, 86,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 206, 86,0.8)'
        }, { // orange
            backgroundColor: 'rgba(253, 180, 92,0.2)',
            borderColor: 'rgba(253, 180, 92,1)',
            pointBackgroundColor: 'rgba(253, 180, 92,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(253, 180, 92,0.8)'
        }, { // dark gray
            backgroundColor: 'rgba(148, 159, 177,0.2)',
            borderColor: 'rgba(148, 159, 177,1)',
            pointBackgroundColor: 'rgba(148, 159, 177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148, 159, 177,0.8)'
        }
    ];
    public systemDropdownItems = [
        {
            display: 'All',
            value: 'all',
            selected: true
        }, {
            display: 'PR-C',
            value: 'prc',
            selected: true
        }, {
            display: 'PR-D',
            value: 'prd',
            selected: true
        }, {
            display: 'PR-E',
            value: 'pre',
            selected: true
        }
    ];

    public directionDropdownItems = [
        {
            display: 'All',
            value: 'all',
            selected: true
        }, {
            display: 'Inbound',
            value: 'ib',
            selected: false
        }, {
            display: 'Outbound',
            value: 'ob',
            selected: false
        }
    ];

    constructor(private serverService: ServerService) { }

    ngOnInit() {
        this.refresh();
    }

    public refresh() {
        this.serverService.alldocsRefresh().subscribe(
            message => {
                console.log(message);
            }
        )
    }

    public chartClicked(e: any): void {
        console.log(this.alldocsChart);
        console.log(e);
        if (e.active.length > 0) {
            const chartElement = e.active[0]._chart.getElementAtEvent(event);
            console.log(chartElement[0]._model.datasetLabel)
        }
    }

    public chartHovered(e: any): void {
        console.log(e);
    }

    public systemDropdownCallback = (value: any): void => {
        console.log(value);
        this.dropdowndir.setSelectedIndex(0);
        this.directionDropdownItems[0].selected = true;
        switch (value) {
            case 'all': {
                this.alldocsChartDataTemp = [];
                this.alldocsChart.chart.config.data.datasets = this.alldocsChartData;
                this.alldocsChart.ngOnInit();
                break;
            }
            case 'prc': {
                this.alldocsChartDataTemp = this.alldocsChartData.filter( dataset =>
                    dataset.label.toLowerCase().includes('prc')
                );
                this.alldocsChart.chart.config.data.datasets = this.alldocsChartDataTemp;
                break;
            }
            case 'prd': {
                this.alldocsChartDataTemp = this.alldocsChartData.filter( dataset =>
                    dataset.label.toLowerCase().includes('prd')
                );
                this.alldocsChart.chart.config.data.datasets = this.alldocsChartDataTemp;
                break;
            }
            case 'pre': {
                this.alldocsChartDataTemp = this.alldocsChartData.filter( dataset =>
                    dataset.label.toLowerCase().includes('pre')
                );
                this.alldocsChart.chart.config.data.datasets = this.alldocsChartDataTemp;
                break;
            }
        }
        this.alldocsChart.chart.config.data.datasets.forEach( (dataset, idx) => {
            dataset.backgroundColor = this.alldocsChartColors[idx].backgroundColor;
            dataset.borderColor = this.alldocsChartColors[idx].borderColor;
            dataset.pointBackgroundColor = this.alldocsChartColors[idx].pointBackgroundColor;
            dataset.pointBorderColor = this.alldocsChartColors[idx].pointBorderColor;
            dataset.pointHoverBackgroundColor = this.alldocsChartColors[idx].pointHoverBackgroundColor;
            dataset.pointHoverBorderColor = this.alldocsChartColors[idx].pointHoverBorderColor;
        });
        this.alldocsChart.chart.update();
    }

    public directionDropdownCallback = (value: any): void => {
        console.log(value);
        if (this.alldocsChartDataTemp.length === 0) {
            this.alldocsChartDataTemp = this.alldocsChartData;
        }

        switch (value) {
            case 'all': {
                this.alldocsChart.chart.config.data.datasets = this.alldocsChartDataTemp;
                break;
            }
            case 'ib': {
                this.alldocsChart.chart.config.data.datasets = this.alldocsChartDataTemp.slice().filter( dataset =>
                    dataset.label.toLowerCase().includes('ib')
                )
                break;
            }
            case 'ob': {
                this.alldocsChart.chart.config.data.datasets = this.alldocsChartDataTemp.slice().filter( dataset =>
                    dataset.label.toLowerCase().includes('ob')
                )
                break;
            }
        }
        this.alldocsChart.chart.config.data.datasets.forEach( (dataset, idx) => {
            dataset.backgroundColor = this.alldocsChartColors[idx].backgroundColor;
            dataset.borderColor = this.alldocsChartColors[idx].borderColor;
            dataset.pointBackgroundColor = this.alldocsChartColors[idx].pointBackgroundColor;
            dataset.pointBorderColor = this.alldocsChartColors[idx].pointBorderColor;
            dataset.pointHoverBackgroundColor = this.alldocsChartColors[idx].pointHoverBackgroundColor;
            dataset.pointHoverBorderColor = this.alldocsChartColors[idx].pointHoverBorderColor;
        });
        this.alldocsChart.chart.update();

        // this.lineChartData = _lineChartData;
    //    if (value === 'all') {
            // this.chartJS.chart.config.data.datasets = this.lineChartData;
            // this.chartJS.chart.config.color = this.lineChartColors;
    //    } else {
        /*    this.chartJS.chart.config.data.datasets = this.lineChartData.filter( dataset => dataset.label === value);
            this.chartJS.chart.config.data.datasets[0].backgroundColor = 'rgba(255, 99, 132,0.2)';
            this.chartJS.chart.config.data.datasets[0].borderColor = 'rgba(255, 99, 132,1)';
            this.chartJS.chart.config.data.datasets[0].pointBackgroundColor = 'rgba(255, 99, 132,1)';
            this.chartJS.chart.config.data.datasets[0].pointBorderColor = '#fff';
            this.chartJS.chart.config.data.datasets[0].pointHoverBackgroundColor = '#fff';
            this.chartJS.chart.config.data.datasets[0].pointHoverBorderColor = 'rgba(255, 99, 132,0.8)'; */
    //        this.alldocsChart.chart.config.data.labels.push('August');
    //        this.alldocsChart.chart.config.data.datasets.forEach((dataset) => {
    //            dataset.data.push(Math.floor(Math.random() * 150));
    //        });
    //    }
    //    this.chartJS.chart.config.data.datasets[0].borderColor = 'rgb(' +
    //        Math.floor(Math.random() * 255) + ', ' +
    //        Math.floor(Math.random() * 255) + ', ' +
    //        Math.floor(Math.random() * 255) + ')'
    //    console.log(this.alldocsChart.chart);
    //    this.alldocsChart.chart.update();
    //    console.log(this.alldocsChart.chart);
        /*// this.update = false;
        this.lineChartData.length = 0;
        const temp = JSON.parse(JSON.stringify(this.lineChartData));
        temp.splice(temp.findIndex( dataset => dataset.label === value), 1);
        console.log(temp);
        this.lineChartData.length = temp.length;
        this.lineChartData = temp;
        // this.chart.chart.config.data = this.lineChartData;
        // const clone = JSON.parse(JSON.stringify(this.lineChartData));
        // this.lineChartData = [];
        /* setTimeout( () => {
            // this.lineChartData = clone;
            console.log(temp);

        }, 0) */
    }

}
