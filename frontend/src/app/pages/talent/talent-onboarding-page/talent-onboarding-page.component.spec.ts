import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentOnboardingPageComponent } from './talent-onboarding-page.component';

describe('TalentOnboardingPageComponent', () => {
  let component: TalentOnboardingPageComponent;
  let fixture: ComponentFixture<TalentOnboardingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TalentOnboardingPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentOnboardingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
