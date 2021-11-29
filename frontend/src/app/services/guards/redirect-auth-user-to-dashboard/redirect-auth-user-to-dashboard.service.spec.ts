import { TestBed } from '@angular/core/testing';

import { RedirectAuthUserToDashboardService } from './redirect-auth-user-to-dashboard.service';

describe('RedirectAuthUserToDashboardService', () => {
  let service: RedirectAuthUserToDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectAuthUserToDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
