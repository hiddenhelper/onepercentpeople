import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerAllJobResponsesFiltersComponent } from './employer-all-job-responses-filters.component';

describe('EmployerAllJobResponsesFiltersComponent', () => {
  let component: EmployerAllJobResponsesFiltersComponent;
  let fixture: ComponentFixture<EmployerAllJobResponsesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerAllJobResponsesFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerAllJobResponsesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
