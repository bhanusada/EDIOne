import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    @Input() isValid: boolean;
    @Input() placeholder: string;

    @Output() executeSearch = new EventEmitter();
    @Output() validate = new EventEmitter(false);

    public searchValue: string;

    constructor() { }

    ngOnInit() {
        this.clearSearch();
    }

    clearSearch() {
        this.searchValue = null;
        this.isValid = true;
        this.validateSearch();
        this.doSearch();
    }

    validateSearch() {
        this.validate.emit({ value: this.searchValue });
        setTimeout(() => {
            if (this.isValid) {
                this.doSearch();
            }
        }, 1);
    }

    doSearch() {
        if (this.isValid) {
            this.executeSearch.emit({ value: this.searchValue });
        }
    }

    keystrokeSearch(event: any) {
        if (event.which === 13) {
            this.doSearch();
        } else if (event.which === 27) {
            this.clearSearch();
        } else if ((event.which === 8 || event.which === 46) && this.searchValue === '') {
            this.clearSearch();
        }
    }
}
