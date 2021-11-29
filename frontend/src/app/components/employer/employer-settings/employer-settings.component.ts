import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'employer-settings',
  templateUrl: './employer-settings.component.html',
  styleUrls: ['./employer-settings.component.scss']
})
export class EmployerSettingsComponent implements OnInit {

  @Input() events: Observable<void>;
  eventsSubject: Subject<void> = new Subject<void>();

  public currentTab: string = "company";

  public items: any[] = [];

  constructor() {
    this.items = [
      // { title: "My Profile", subtitle: "Set up your basic profile", icon: "user", key: "basic" },
      { title: "Company Profile", subtitle: "Set up your company information", icon: "briefcase", key: "company" },
      { title: "Payments", subtitle: "Set up payment account", icon: "credit-card", key: "banking" },
    ];
  }

  ngOnInit(): void {
  }

  handleMenuEvents($event: any): void {
    if ($event.item) {
      this.currentTab = $event.item.key;
    }
  }

  menuItemClicked(item: any): void {
    this.currentTab = item.key;
  }
}
