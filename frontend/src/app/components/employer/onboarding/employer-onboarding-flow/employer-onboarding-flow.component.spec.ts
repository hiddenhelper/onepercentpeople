import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerOnboardingFlowComponent } from './employer-onboarding-flow.component';

describe('EmployerOnboardingFlowComponent', () => {
  let component: EmployerOnboardingFlowComponent;
  let fixture: ComponentFixture<EmployerOnboardingFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerOnboardingFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerOnboardingFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
