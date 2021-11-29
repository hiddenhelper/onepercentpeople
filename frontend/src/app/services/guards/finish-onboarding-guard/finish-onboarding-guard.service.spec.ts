import { TestBed } from '@angular/core/testing';

import { FinishOnboardingGuardService } from './finish-onboarding-guard.service';

describe('FinishOnboardingGuardService', () => {
  let service: FinishOnboardingGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinishOnboardingGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
