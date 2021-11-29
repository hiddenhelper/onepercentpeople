import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'talent-profile',
  templateUrl: './talent-profile.component.html',
  styleUrls: ['./talent-profile.component.scss']
})
export class TalentProfileComponent implements OnInit {

  @Input() events: Observable<void>;
  eventsSubject: Subject<void> = new Subject<void>();

  public currentTab: string = "basic";

  public items: any[] = [];

  constructor() {

    this.items = [
      { title: "My Profile", subtitle: "Set up your basic profile", icon: "user", key: "basic" },
      { title: "Work Experience", subtitle: "Set up your work history", icon: "briefcase", key: "work" },
      { title: "Education", subtitle: "Set up your education history", icon: "academic-cap", key: "education" },
      { title: "My Introduction", subtitle: "Introduce yourself in a short 2 min video", icon: "video-camera", key: "videos" },
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
