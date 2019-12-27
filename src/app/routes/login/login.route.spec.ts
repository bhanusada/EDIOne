/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterOutlet } from '@angular/router';

import { LoginRoute } from './login.route';

// Including only for Login route due to <router-outlet> not being immediately available
class MockRouter {
    public navigate() { };
    public navigateByUrl() { };
}

describe('LoginRoute', () => {
    let component: LoginRoute;
    let fixture: ComponentFixture<LoginRoute>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useClass: MockRouter }
            ],
            imports: [
                AppModule,
                RouterTestingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginRoute);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
