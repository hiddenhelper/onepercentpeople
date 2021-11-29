import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'home-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesComponent implements OnInit {
  roles: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.roles = [
      { id: 1, img: '/assets/images/icons/bank-card-view.svg', title: 'Accountants', description: 'Trained accountants ready to fulfill all of your accounting needs.', salary_min: '465', salary_max: '1685', num: 300 },
      { id: 2, img: '/assets/images/icons/banknote-1.svg', title: 'Client Success', description: 'Client success managers ready to keep your clients happy.', salary_min: '822', salary_max: '1997', num: 204 },
      { id: 3, img: '/assets/images/icons/calculator.svg', title: 'Recruiters', description: 'Recruiters ready to help source and grow your team.', salary_min: '940', salary_max: '2256', num: 102 },
      { id: 4, img: '/assets/images/icons/coins.svg', title: 'Back Office', description: 'Back office professionals to fulfill the rest of your back office needs.', salary_min: '893', salary_max: '2279', num: 160 },
      { id: 5, img: '/assets/images/icons/banknote.svg', title: 'Marketing', description: 'Marketing professionals ready to build and execute a marketing strategy.', salary_min: '963', salary_max: '2585', num: 180 },
      { id: 6, img: '/assets/images/icons/atm.svg', title: 'Sales', description: 'Sales professionals familiar with foreign markets', salary_min: '705', salary_max: '2115', num: 220 },
    ];
  }

}
