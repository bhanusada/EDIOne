import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VanbacklogsComponent } from './vanbacklogs.component';

describe('VanbacklogsComponent', () => {
  let component: VanbacklogsComponent;
  let fixture: ComponentFixture<VanbacklogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VanbacklogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VanbacklogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
