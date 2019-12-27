import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ExcelService } from '../../services/excel.service';

@Component({
    selector: 'table-card',
    templateUrl: './table-card.component.html'
})
export class TableCardComponent implements OnInit {

    @Input() columns: Array<any>;
    @Input() delete: Function;
    @Input() edit: Function;
    @Input() limit: boolean;
    @Input() orderBy: string;
    @Input() rows: Array<any>;
    @Input() showActions: boolean;
    @Input() exportenable: boolean;
    @Input() showLayoutToggles: boolean;
    @Input() showSearch: boolean;
    @Input() tableHeader: string;

    @ViewChild('dataTable') dataTable;

    activeToggle: string;
    csvHeaders: Array<any>;
    internalRows: any = [];
    selected: Array<any>;
    query: any;
    isSearchValid: boolean;
    sortedColumn: string;
    currentPageLimit = 5;
    pageLimitOptions = [
        { display: 5, value: 5 },
        { display: 10, value: 10 },
        { display: 25, value: 25 },
        { display: 50, value: 50 }
      ];

    constructor(
        public excelService: ExcelService
    ) {
        this.activeToggle = 'list';
        this.csvHeaders = [];
        this.internalRows = [];
        this.selected = [];
        this.sortedColumn = '';
    }

    ngOnInit() {
        Object.assign(this.internalRows, this.rows);
        this.internalRows = [...this.internalRows];

        this.query = {
            order: this.orderBy
        };

        this.isColumnSorted = this.isColumnSorted.bind(this);
    }

    toggleAll(event: any) {
        console.log(this.selected);
    }

    isActiveToggle(toggle) {
        if (this.activeToggle === toggle) {
            return 'active';
        } else {
            return '';
        }
    }

    searchList($event) {
        const searchValue = $event.value;
        this.selected = [];

        let searchResults: Array<any> = [];
        Object.assign(searchResults, this.rows);
        if (searchValue) {

            searchResults = this.rows.filter(row => {
                let retVal = false;
                this.columns.filter(column => {
                    if (row[column.prop].toLowerCase().includes(searchValue.toLowerCase())) {
                        retVal = true;
                    }
                });
                return retVal;
            });
        }

        this.internalRows = searchResults;
        if (this.dataTable) {
            this.dataTable.offset = 0;
        }
    }

    validateSearch($event) {
        const searchValue = $event.value;
        // Perform extra validation if needed
        console.log(searchValue);
        return true;
    }

    isColumnSorted({ row, column, value }) {
        return {
            'is-sorted': column.name === this.sortedColumn
        };
    }

    sortTable($event) {
        this.sortedColumn = $event.column.name;
    }

    exportToExcel(event) {
        this.excelService.exportAsExcelFile(this.internalRows, 'userauditreport');
      }

    dropdownCallbacks = (value: any): void => {
        this.currentPageLimit = value;
    }

}
