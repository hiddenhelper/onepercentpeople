import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobPageComponent } from './view-job-page.component';

describe('ViewJobPageComponent', () => {
  let component: ViewJobPageComponent;
  let fixture: ComponentFixture<ViewJobPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewJobPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
