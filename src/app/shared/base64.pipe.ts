import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'base64'
})
export class Base64Pipe implements PipeTransform {
    transform(method: string, value: string): string {
        let newValue = '';
        if (method === 'encode') {
            newValue = btoa(encodeURIComponent(value));
        } else {
            value = value.replace(/\s/g, '');
            newValue = decodeURIComponent(atob(value));
        }

        return newValue;
    }
}
