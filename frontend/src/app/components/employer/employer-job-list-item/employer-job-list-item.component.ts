import { Component, OnInit, Input } from '@angular/core';
import { Job } from '@interfaces/job';

@Component({
  selector: 'employer-job-list-item',
  templateUrl: './employer-job-list-item.component.html',
  styleUrls: ['./employer-job-list-item.component.scss']
})
export class EmployerJobListItemComponent implements OnInit {

  @Input() job: Job;

  constructor() { }

  ngOnInit(): void {
  }

}
