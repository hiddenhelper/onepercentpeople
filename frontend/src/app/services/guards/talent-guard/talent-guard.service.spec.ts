import { TestBed } from '@angular/core/testing';

import { TalentGuardService } from './talent-guard.service';

describe('TalentGuardService', () => {
  let service: TalentGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalentGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
