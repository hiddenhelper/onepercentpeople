import { Component, OnInit } from '@angular/core';
import { Job } from '@interfaces/job';
import { JobService } from '@services/job/job.service';

@Component({
  selector: 'app-talent-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.scss']
})
export class ViewJobsComponent implements OnInit {

  public jobs: Job[] = [];
  public loading: boolean = false;
  public page: number = 1;
  // public pageEvent: PageEvent;


  constructor(
    private jobService: JobService
  ) { }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(page: number = 0): void {
    this.jobService.getAll({ page: page }).subscribe(data => {
      this.jobs = data.jobs;
    });
  }

  // getPaginatedData(event: PageEvent): PageEvent {
  //   console.log(event);
  //   this.getJobs(event.pageIndex);
  //   this.fooService.getdata(event).subscribe(
  //     response =>{
  //       if(response.error) {
  //         // handle error
  //       } else {
  //         this.datasource = response.data;
  //         this.pageIndex = response.pageIndex;
  //         this.pageSize = response.pageSize;
  //         this.length = response.length;
  //       }
  //     },
  //     error =>{
  //       // handle error
  //     }
  //   );
  //   return event;
  // }


}
