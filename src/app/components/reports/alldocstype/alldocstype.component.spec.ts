import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldocstypeComponent } from './alldocstype.component';

describe('AlldocstypeComponent', () => {
  let component: AlldocstypeComponent;
  let fixture: ComponentFixture<AlldocstypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldocstypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldocstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
