import { Component, OnInit } from '@angular/core';
import { JobResponse } from '@interfaces/job_response';
import { JobResponseService } from '@services/job-response/job-response.service';

@Component({
  selector: 'app-talent-apply-to-job',
  templateUrl: './apply-to-job.component.html',
  styleUrls: ['./apply-to-job.component.scss']
})
export class ApplyToJobComponent implements OnInit {

  constructor(
    private jobResponseService: JobResponseService
  ) { }

  ngOnInit(): void {

  }

  submitApplication(): void {

  }

}
