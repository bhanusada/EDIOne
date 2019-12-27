import { Component, OnInit } from '@angular/core';

import { ServerService } from '../../../services/server.service';

@Component({
  selector: 'app-vanprobe',
  templateUrl: './vanprobe.component.html',
  styleUrls: ['./vanprobe.component.scss']
})
export class VanprobeComponent implements OnInit {

    public lineChartData = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'SXR0O00M', fill: true, steppedLine: true},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'SXR0O00N', fill: true, steppedLine: true},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'SXR0O00O', fill: true, steppedLine: true}
      ];
      public lineChartType = 'bar';
      public lineChartLegend = true;
      public lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      public lineChartOptions = {
        responsive: true,
        title: {
            display: true,
            text: 'Avg Trip Time For Van Probe'
        },
        legend: {
            display: true,
            position: 'bottom'
        }
      };

    constructor(private serverService: ServerService) { }

    ngOnInit() {
        this.refresh();
    }

    public refresh() {
        this.serverService.vanRefresh().subscribe(
            message => {
                console.log(message);
            }
        )
    }

}
