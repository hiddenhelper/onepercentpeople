import { TestBed } from '@angular/core/testing';

import { EmployerGuardService } from './employer-guard.service';

describe('EmployerGuardService', () => {
  let service: EmployerGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
