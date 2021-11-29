import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerOnboardingPageComponent } from './employer-onboarding-page.component';

describe('EmployerOnboardingPageComponent', () => {
  let component: EmployerOnboardingPageComponent;
  let fixture: ComponentFixture<EmployerOnboardingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerOnboardingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerOnboardingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
