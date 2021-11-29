import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerViewJobsComponent } from './employer-view-jobs.component';

describe('EmployerViewJobsComponent', () => {
  let component: EmployerViewJobsComponent;
  let fixture: ComponentFixture<EmployerViewJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerViewJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerViewJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
