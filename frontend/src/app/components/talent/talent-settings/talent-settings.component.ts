import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'talent-settings',
  templateUrl: './talent-settings.component.html',
  styleUrls: ['./talent-settings.component.scss']
})
export class TalentSettingsComponent implements OnInit {

  @Input() events: Observable<void>;
  eventsSubject: Subject<void> = new Subject<void>();

  public currentTab: string = "banking";

  public items: any[] = [];

  constructor() {
    this.items = [
      { title: "Withdrawal", subtitle: "Set up your withdrawal method", icon: "credit-card", key: "banking" },
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
