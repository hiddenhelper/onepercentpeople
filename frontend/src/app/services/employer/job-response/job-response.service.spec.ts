import { TestBed } from '@angular/core/testing';

import { JobResponseService } from './job-response.service';

describe('JobResponseService', () => {
  let service: JobResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
