import { Component, OnInit, ViewChild } from '@angular/core';
import { Siuserauditservice } from '../../../services/siuseraudit.service';
import { GlobalLoader } from 'shared/global-loader';
// import { ALLOW_MULTIPLE_PLATFORMS } from '@angular/platform';

@Component({
    selector: 'app-useraudit',
    templateUrl: './useraudit.component.html',
    styleUrls: ['./useraudit.component.scss']
})
export class UserauditComponent implements OnInit {
    @ViewChild('table4') table4;

    customColumns: Array<any>;
    customRows: Array<any>;
    dropdownItems: Array<any>;
    extract: boolean;
    loader: boolean;
    errmsg = false;
    wsparms = {};
    userlist: any = [];
    userlist_new = {};
    userlist_new2: any = [];
    errorstatus: string;
    cols = [
        { key: 'ldapid', sortable: true, name: 'LDAPID', prop: 'ldapid', display: 'LDAPID' },
        { key: 'firstname', sortable: true, name: 'FIRSTNAME', prop: 'firstname', display: 'FIRST NAME' },
        { key: 'lastname', sortable: true, name: 'LASTNAME', prop: 'lastname', display: 'LAST NAME' },
        { key: 'accesstype', sortable: true, name: 'ACCESSTYPE', prop: 'accesstype', display: 'ACCESS TYPE' },
        { key: 'usergrpname', sortable: true, name: 'USERGRPNAME', prop: 'usergrpname', display: 'USER GROUP NAME' },
        { key: 'lastlogintime', sortable: true, name: 'LASTLOGINTIME', prop: 'lastlogintime', display: 'LAST LOGIN TIME' },
        // {  key: 'activestatus', sortable: true, name:'ACTIVESTATUS', prop:'activestatus',display:'ACTIVE STATUS' },
        { key: 'validflg', sortable: true, name: 'VALIDFLG', prop: 'validflg', display: 'LDAP VALIDITY' }
    ];

    constructor( public siuserauditservice: Siuserauditservice, public globalLoader: GlobalLoader) {
        this.dropdownItems = [
            {
                display: 'Select',
                value: 'NONE',
                selected: false
            },
            {
                display: 'SI QA',
                value: 'SIPRC',
                selected: false
            }
            // ,
            // {
            //     display: 'SI PRD',
            //     value: 'SIPRD',
            //     selected: false
            // },
            // {
            //     display: 'SI PRE',
            //     value: 'SIPRE',
            //     selected: false
            // },
            // {
            //     display: 'SI PRF',
            //     value: 'SIPRF',
            //     selected: false
            // }
        ];
    }

    ngOnInit(): void { }

    dropdownCallback = (value: any): void => {
        this.extract = false;
        this.errmsg = false;
        this.wsparms = {
            logId: 'B2BONE',
            system: value,
        };
        this.siuserauditservice.wsparms = this.wsparms;
        const me = this;
        // this.loader = true;
        this.globalLoader.show();
        const res = this.siuserauditservice.userauditextract();
        Promise.all([res])
            .then(function (values) {
                console.log(values);
                const response = values[0]
                me.handleSuccess(response);
            })

            .catch(error => {
                console.error(error);
                me.handleError(error);

            });
    }

    handleSuccess(response) {
        this.userlist = response[0];
        this.userlist = this.userlist['userdetails'];
        console.log(this.userlist);

        this.userlist.forEach(function (o) {
            Object.keys(o).forEach(function (k) {
                if (o[k] === null) {
                    o[k] = '';
                }
            });

        });

        this.userlist.forEach(function (o) {
            Object.keys(o).forEach(function (k) {
                if (o['validflg'] === 'N') {
                    o['validflg'] = '<font color=\'red\'>Invalid LDAPID</font>';
                } else if (o['validflg'] === 'Y' && o['activestatus'] === 'Inactive') {
                    o['validflg'] = '<font color=\'orange\'>Inactive</font>'
                } else if (o['validflg'] === 'Y' && o['activestatus'] === 'Active') {
                    o['validflg'] = '<font color=\'green\'>Active</font>'
                }
            });

        });

        this.extract = true;
        // this.loader = false;
        this.globalLoader.hide();
    }

    handleError(error) {
        this.extract = false;
        this.errorstatus = error.status;
        // this.loader = false;
        this.globalLoader.hide();
        this.errmsg = true;
    }
    closebanner() {
        this.errmsg = false;
    }
}
