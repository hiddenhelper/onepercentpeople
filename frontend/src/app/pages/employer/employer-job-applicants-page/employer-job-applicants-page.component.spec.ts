import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobApplicantsPageComponent } from './employer-job-applicants-page.component';

describe('EmployerJobApplicantsPageComponent', () => {
  let component: EmployerJobApplicantsPageComponent;
  let fixture: ComponentFixture<EmployerJobApplicantsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerJobApplicantsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerJobApplicantsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
