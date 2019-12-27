import { NgModule } from '@angular/core';
import { UXStyleguideModule } from 'ux-angular-styleguide';
import { SampleContent } from '../components/sample-content';

export class MockGlobals {
    constructor() {
        window['Accordion'] = class Accordion {
            init(id: string) { };
        }
        window['CheckboxGroup'] = class CheckboxGroup {
            init(id: string) { };
        }
        window['CounterInput'] = class CounterInput {
            init(id: string) { };
        }
        window['DropdownList'] = class DropdownList {
            init(id: string) { };
        }
        window['LoaderBtn'] = class LoaderBtn {
            create() {
                return {
                    start: () => { },
                    stop: () => { }
                };
            }
        }
        window['RadioGroup'] = class RadioGroup {
            init(id: string) { };
        }
        window['TabList'] = class TabList {
            init(id: string) { };
        }
        window['Table'] = class Table {
            init(id: string) { };
        }
        window['FilterTable'] = class FilterTable {
            init(id: string) { };
        }
        window['DatePicker'] = class DatePicker {
            init(id: string) { };
        }
    }
}

@NgModule({
    declarations: [SampleContent],
    entryComponents: [SampleContent],
    imports: [UXStyleguideModule],
    exports: [UXStyleguideModule]
})
export class TestingModule { }
