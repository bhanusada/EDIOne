import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServerService } from '../../../services/server.service';
import { GlobalLoader } from 'shared/global-loader';

@Component({
    selector: 'app-vanbacklogs',
    templateUrl: './vanbacklogs.component.html',
    styleUrls: ['./vanbacklogs.component.scss']
})
export class VanbacklogsComponent implements OnInit {

    public checkboxes = [
        {
            label: 'GENTRAN',
            checked: false,
            value: 'SXR0O00P'
        }, {
            label: 'USAP',
            checked: false,
            value: 'SXR0O00M'
        }, {
            label: 'CARET',
            checked: false,
            value: 'SXR0O00O'
        }, {
            label: 'TMS',
            checked: false,
            value: 'SXR0O00N'
        }
    ];

    public columns = [
        {
            name: 'Mailslots',
            key: 'mailslot',
            defaultSort: true,
            sortable: true,
            centerAlign: true
        },
        {
            name: 'Flow Type',
            key: 'flow',
            defaultSort: true,
            sortable: true,
            centerAlign: true
        },
    /*    {
            name: 'DC 2',
            key: 'dc2',
            defaultSort: true,
            sortable: true
        },
        {
            name: 'Center Align',
            key: 'dc3',
            centerAlign: true,
            defaultSort: true,
            sortable: true
        },
        {
            name: 'Right Align',
            key: 'dc4',
            rightAlign: true,
            defaultSort: true,
            sortable: true
        } */
    ];

    public rows = [];

    public buildTable = false;

    public form = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
        fromDate: new FormControl(''),
        fromTime: new FormControl(''),
        toDate: new FormControl(''),
        toTime: new FormControl('')
    });

    public formData = {
        email: null,
        password: null,
        fromDate: null,
        fromTime: null,
        toDate: null,
        toTime: null,
        mailboxes: []
    };

    public statuses = [];

    constructor(private serverService: ServerService, private globalLoader: GlobalLoader) { }

    ngOnInit() {
        this.serverService.vanbacklogsStatus().subscribe(
            (message: any) => {
                console.log(message);
                if (message.includes('SXR')) {
                    this.statuses.push(message);
                } else {
                    this.statuses[this.statuses.length - 1] = this.statuses[this.statuses.length - 1].split(' - ')[0] + ' - ' + message;
                }
            }
        );
        this.serverService.vanbacklogsCounts().subscribe(
            (counts: any) => {
                console.log(counts);
                const mailslots = Object.keys(counts).filter(m => m.includes('SXR'));
                const docs = [];
                counts.DocTypes.forEach(doc => {
                    docs.push(doc.id);
                    this.columns.push({ name: doc.id, key: doc.id, defaultSort: false, centerAlign: true, sortable: true});
                });
                mailslots.forEach(
                    mailslot => {
                        Object.keys(counts[mailslot])
                            .filter(f => f !== 'total')
                            .forEach(f => {
                                const temp: any = { 'mailslot': mailslot, 'flow': f };
                                docs.forEach(doc => {
                                    if (counts[mailslot][f][doc] === undefined) {
                                        temp[doc] = 0;
                                    } else {
                                        temp[doc] = counts[mailslot][f][doc];
                                    }
                                });
                                this.rows.push(temp);
                            });
                    })
                this.buildTable = true;
                this.globalLoader.hide();
            }
        )
    }

    public checkboxesValues(e) {
        this.formData.mailboxes = e.values;
    }

    public fromDateValue(date: any) {
        this.formData.fromDate = this.dateFormat(date);
    }

    public toDateValue(date: any) {
        this.formData.toDate = this.dateFormat(date);
    }

    public dateFormat(date) {
        return date.substr(5, 2) + date.substr(8) + date.substr(2, 2)
    }

    public onClose(index) {
        this.statuses.splice(index, 1);
    }

    public onSubmit() {
        this.globalLoader.show();
        this.statuses = [];
        this.buildTable = false;
        this.formData.email = this.form.value.email;
        this.formData.password = this.form.value.password;
        this.formData.fromTime = this.form.value.fromTime.split(':').join('');
        this.formData.toTime = this.form.value.toTime.split(':').join('');
        this.serverService.vanbacklogs(this.formData);
    }

}
