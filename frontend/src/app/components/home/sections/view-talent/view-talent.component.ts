import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'home-view-talent',
  templateUrl: './view-talent.component.html',
  styleUrls: ['./view-talent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewTalentComponent implements OnInit {
  talents: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getTalent();
  }

  getTalent(): void {
    this.talents = [
      { id: 1, img: '/assets/images/avatars/avatar-1.png', name: 'Leslie Alexander', role: 'Accounting Manager', previous_employer: 'InVision' },
      { id: 2, img: '/assets/images/avatars/avatar-2.png', name: 'Jenny Wilson', role: 'Accounting Manager', previous_employer: 'InVision' },
      { id: 3, img: '/assets/images/avatars/avatar-3.png', name: 'Leslie Alexander', role: 'Accounting Manager', previous_employer: 'InVision' },
      { id: 4, img: '/assets/images/avatars/avatar-4.png', name: 'Jenny Wilson', role: 'Accounting Manager', previous_employer: 'InVision' },
      { id: 5, img: '/assets/images/avatars/avatar-5.png', name: 'Leslie Alexander', role: 'Accounting Manager', previous_employer: 'InVision' },
      { id: 6, img: '/assets/images/avatars/avatar-6.png', name: 'Jenny Wilson', role: 'Accounting Manager', previous_employer: 'InVision' },
      { id: 7, img: '/assets/images/avatars/avatar-7.png', name: 'Leslie Alexander', role: 'Accounting Manager', previous_employer: 'InVision' },
      { id: 8, img: '/assets/images/avatars/avatar-8.png', name: 'Jenny Wilson', role: 'Accounting Manager', previous_employer: 'InVision' },
    ];
  }
}
