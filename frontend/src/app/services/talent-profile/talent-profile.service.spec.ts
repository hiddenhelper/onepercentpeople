import { TestBed } from '@angular/core/testing';

import { TalentProfileService } from './talent-profile.service';

describe('TalentProfileService', () => {
  let service: TalentProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalentProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
