import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PotypeComponent } from './potype.component';

describe('PotypeComponent', () => {
  let component: PotypeComponent;
  let fixture: ComponentFixture<PotypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PotypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
