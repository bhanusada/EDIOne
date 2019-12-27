import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanprobeComponent } from './vanprobe.component';

describe('VanprobeComponent', () => {
  let component: VanprobeComponent;
  let fixture: ComponentFixture<VanprobeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanprobeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanprobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
