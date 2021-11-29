import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'about-mission',
  templateUrl: './about-mission.component.html',
  styleUrls: ['./about-mission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMissionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
