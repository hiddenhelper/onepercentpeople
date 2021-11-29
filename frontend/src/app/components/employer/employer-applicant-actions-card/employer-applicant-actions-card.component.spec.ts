import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerApplicantActionsCardComponent } from './employer-applicant-actions-card.component';

describe('EmployerApplicantActionsCardComponent', () => {
  let component: EmployerApplicantActionsCardComponent;
  let fixture: ComponentFixture<EmployerApplicantActionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployerApplicantActionsCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerApplicantActionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
