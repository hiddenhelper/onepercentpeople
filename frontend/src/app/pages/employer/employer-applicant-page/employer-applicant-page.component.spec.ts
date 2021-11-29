import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerApplicantPageComponent } from './employer-applicant-page.component';

describe('EmployerApplicantPageComponent', () => {
  let component: EmployerApplicantPageComponent;
  let fixture: ComponentFixture<EmployerApplicantPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerApplicantPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerApplicantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
