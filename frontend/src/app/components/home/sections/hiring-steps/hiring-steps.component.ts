import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'home-hiring-steps',
  templateUrl: './hiring-steps.component.html',
  styleUrls: ['./hiring-steps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HiringStepsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
