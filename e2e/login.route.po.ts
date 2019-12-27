import { browser, element, by } from 'protractor/built';

export class LoginRoute {
    navigateTo() {
        return browser.get('/');
    }

    getHeaderTitle() {
        return element(by.css('.header .product-info')).getText();
    }
}
