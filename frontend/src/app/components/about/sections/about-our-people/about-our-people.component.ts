import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'about-our-people',
  templateUrl: './about-our-people.component.html',
  styleUrls: ['./about-our-people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutOurPeopleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
