import { LoginRoute } from './login.route.po';

describe('Login Route', function () {
    let page: LoginRoute;

    beforeEach(() => {
        page = new LoginRoute();
    });

    it('should have title of Angular Framework', () => {
        page.navigateTo();
        expect(page.getHeaderTitle()).toContain('Angular Framework');
    });
});
