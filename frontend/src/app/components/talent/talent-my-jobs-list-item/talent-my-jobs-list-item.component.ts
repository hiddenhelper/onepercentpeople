import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'talent-my-jobs-list-item',
  templateUrl: './talent-my-jobs-list-item.component.html',
  styleUrls: ['./talent-my-jobs-list-item.component.scss']
})
export class TalentMyJobsListItemComponent implements OnInit {

  // TODO: change to type Job
  @Input() job: any;

  constructor() { }

  ngOnInit(): void {
  }

}
