import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'employer-settings-sidebar',
  templateUrl: './employer-settings-sidebar.component.html',
  styleUrls: ['./employer-settings-sidebar.component.scss']
})
export class EmployerSettingsSidebarComponent implements OnInit {

  @Input() events: Observable<void>;
  @Output() menuEvents = new EventEmitter();

  @Input() currentTab: string;
  @Input() items: any[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  menuItemClicked(item: any): void {
    this.menuEvents.emit({ name: 'menu-click', item: item, source: 'employer-settings-sidebar' });
  }

}
