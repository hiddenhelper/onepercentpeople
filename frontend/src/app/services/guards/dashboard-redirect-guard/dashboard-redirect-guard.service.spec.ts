import { TestBed } from '@angular/core/testing';

import { DashboardRedirectGuardService } from './dashboard-redirect-guard.service';

describe('DashboardRedirectGuardService', () => {
  let service: DashboardRedirectGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardRedirectGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
