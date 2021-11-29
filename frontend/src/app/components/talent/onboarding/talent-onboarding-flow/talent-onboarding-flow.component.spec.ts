import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentOnboardingFlowComponent } from './talent-onboarding-flow.component';

describe('TalentOnboardingFlowComponent', () => {
  let component: TalentOnboardingFlowComponent;
  let fixture: ComponentFixture<TalentOnboardingFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentOnboardingFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentOnboardingFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
