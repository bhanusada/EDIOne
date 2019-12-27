/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'app.module';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeRoute } from './home.route';

describe('HomeRoute', () => {
    let component: HomeRoute;
    let fixture: ComponentFixture<HomeRoute>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                RouterTestingModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeRoute);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
