import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerApplicantsPageComponent } from './employer-applicants-page.component';

describe('EmployerApplicantsPageComponent', () => {
  let component: EmployerApplicantsPageComponent;
  let fixture: ComponentFixture<EmployerApplicantsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerApplicantsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerApplicantsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
