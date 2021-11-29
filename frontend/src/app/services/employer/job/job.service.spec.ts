import { TestBed } from '@angular/core/testing';

import { EmployerJobService } from './job.service';

describe('EmployerJobService', () => {
  let service: EmployerJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
