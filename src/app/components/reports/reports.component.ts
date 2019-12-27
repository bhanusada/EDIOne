import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsService } from '../../services/reports.service';
import { ServerService } from '../../services/server.service';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

    public tabs = [
        {
            heading: 'ALL DOCS',
            name: 'alldocs',
            controller: 'alldocs-2-tab',
            selected: true,
            link: '/home/reports'
        }, {
            heading: 'ORDERS',
            name: 'potype',
            controller: 'potype-1-tab',
            selected: false,
            link: 'po'
        }, {
            heading: 'TRANSPORT',
            name: 'tmstype',
            controller: 'tmstype-3-tab',
            selected: false,
            link: 'tms'
        }, {
            heading: 'ONLINE',
            name: 'onlinetype4',
            controller: 'onlinetype-4-tab',
            selected: false,
            link: 'alldocs'
        }, {
            heading: 'CANADA',
            name: 'bustype5',
            controller: 'bustype-5-tab',
            selected: false,
            link: 'alldocs'
        }, {
            heading: 'NON-MERCH',
            name: 'bustype5',
            controller: 'bustype-5-tab',
            selected: false,
            link: 'alldocs'
        }, {
            heading: 'SVS/POM',
            name: 'bustype5',
            controller: 'bustype-5-tab',
            selected: false,
            link: 'alldocs'
        }, {
            heading: 'VAN PROBE',
            name: 'bustype5',
            controller: 'bustype-5-tab',
            selected: false,
            link: 'van'
        }
    ];

    constructor(private RS: ReportsService, private serverService: ServerService) { }

    public dropdownCallback = (value: any): void => {
        console.log(value);
    };

    public changeTab(idx) {
        console.log(idx);
        this.tabs.forEach((tab, index) => {
            if (index === idx) {
                this.tabs[index].selected = true;
            } else {
                this.tabs[index].selected = false;
            }
        })
    }


    ngOnInit() {
        this.RS.getMetrics()
            .subscribe(metrics => {
                console.log(metrics);
            });

    /*    setInterval(() => {
            let tabindex = this.tabs.findIndex( tab => tab.selected === true);
            this.tabs[tabindex].selected = false;
            tabindex = tabindex + 1;
            if (tabindex === this.tabs.length) {
                tabindex = 0;
            }
            this.tabs[tabindex].selected = true;
        //    if ( tabindex === 0 ) {
        //        this.router.navigate([ this.tabs[tabindex].link]);
        //    } else {
                // this.router.navigate([this.router.url + '/' + this.tabs[tabindex].link]);
                console.log(this.router.url);
                this.router.navigateByUrl('/home/reports-showcase/' + this.tabs[tabindex].link);
        //    }
        }, 5000) */
    }


}
