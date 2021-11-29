import { Component, OnInit } from '@angular/core';
import { Job } from '@app/interfaces/job';
import { JobService } from '@services/job/job.service';
import { JobResponse } from '@interfaces/job_response';
import { JobResponseService } from '@services/job-response/job-response.service';

@Component({
  selector: 'talent-my-jobs',
  templateUrl: './talent-my-jobs.component.html',
  styleUrls: ['./talent-my-jobs.component.scss']
})
export class TalentMyJobsComponent implements OnInit {

  /**
   *
   */
  // TODO: Change to Job[]
  jobs: {}[] = [];

  constructor(
    private jobResponseService: JobResponseService
  ) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobs = [{}, {}, {}, {}, {}, {}, {}, {}, {}];


    this.jobResponseService.getAll({}).subscribe(response => {
      console.log('job responses, ', response);
    }, error => {

    })
  }

}
