import { Component, OnInit } from '@angular/core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'employer-all-job-responses-filters',
  templateUrl: './employer-all-job-responses-filters.component.html',
  styleUrls: ['./employer-all-job-responses-filters.component.scss']
})
export class EmployerAllJobResponsesFiltersComponent implements OnInit {

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  public filters = [
    {
      show: true,
      title: 'JOB APPLIED',
      options: [
        {name: 'Senior Tax Accountant', value: 1, selected: false, total: 2},
        {name: 'Senior Accounting Manager', value: 2, selected: false, total: 2},
      ]
    },
    {
      show: true,
      title: 'ROLES',
      options: [
        {name: 'Accounting Manager', value: 3, selected: true, total: 2},
        {name: 'Accounts Playable Clerk', value: 4, selected: false, total: 0},
        {name: 'Assistant Controller', value: 5, selected: false, total: 0},
        {name: 'Billing Clerk/Manager', value: 6, selected: false, total: 0},
        {name: 'Bookkeeper', value: 7, selected: false, total: 0},
        {name: 'Controller', value: 8, selected: false, total: 0},
        {name: 'Cost Accountant', value: 9, selected: false, total: 0},
        {name: 'Credit and Collections', value: 10, selected: false, total: 0},
        {name: 'Financial Analyst', value: 11, selected: false, total: 0},
        {name: 'Internal Auditor', value: 12, selected: false, total: 0},
        {name: 'Senior Accountant', value: 13, selected: false, total: 0},
        {name: 'Staff Accountant', value: 14, selected: false, total: 0},
        {name: 'Tax Accountant', value: 15, selected: true, total: 2},
      ]
    },
    {
      show: true,
      title: 'TYPE',
      options: [
        {name: 'Full Time', value: 16, selected: false, total: 4},
        {name: 'Part Time', value: 17, selected: false, total: 0},
        {name: 'Freelance', value: 18, selected: false, total: 0},
        {name: 'Fixed Term', value: 19, selected: false, total: 0},
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
