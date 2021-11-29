import { Component, OnInit, Input } from '@angular/core';
import { Job } from '@interfaces/job';

@Component({
  selector: 'app-job-list-item',
  templateUrl: './job-list-item.component.html',
  styleUrls: ['./job-list-item.component.scss']
})
export class JobListItemComponent implements OnInit {

  @Input() job: Job;

  constructor() { }

  ngOnInit(): void {
  }

}
