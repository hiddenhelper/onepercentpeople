import { Component, OnInit } from '@angular/core';
import { Job } from '@interfaces/job';
import { EmployerJobService } from '@services/employer/job/job.service';

@Component({
  selector: 'employer-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  loaded: boolean = false;

  constructor(
    private employerJobService: EmployerJobService
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.employerJobService.getAll({}).subscribe(data => {
      this.jobs = data.jobs;
      this.loaded = true;
    });
  }
}
