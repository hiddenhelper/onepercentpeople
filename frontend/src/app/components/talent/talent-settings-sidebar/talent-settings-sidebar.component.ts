import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'talent-settings-sidebar',
  templateUrl: './talent-settings-sidebar.component.html',
  styleUrls: ['./talent-settings-sidebar.component.scss']
})
export class TalentSettingsSidebarComponent implements OnInit {

  @Input() events: Observable<void>;
  @Output() menuEvents = new EventEmitter();

  @Input() currentTab: string;
  @Input() items: any[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  menuItemClicked(item: any): void {
    this.menuEvents.emit({ name: 'menu-click', item: item, source: 'talent-settings-sidebar' });
  }

}
