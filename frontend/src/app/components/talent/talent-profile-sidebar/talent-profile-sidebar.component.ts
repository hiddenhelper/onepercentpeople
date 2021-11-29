import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'talent-profile-sidebar',
  templateUrl: './talent-profile-sidebar.component.html',
  styleUrls: ['./talent-profile-sidebar.component.scss']
})
export class TalentProfileSidebarComponent implements OnInit {

  @Input() events: Observable<void>;
  @Output() menuEvents = new EventEmitter();

  @Input() currentTab: string;
  @Input() items: any[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  menuItemClicked(item: any): void {
    this.menuEvents.emit({ name: 'menu-click', item: item, source: 'talent-profile-sidebar' });
  }

}
