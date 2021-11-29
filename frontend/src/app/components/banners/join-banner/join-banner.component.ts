import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'banners-join-banner',
  templateUrl: './join-banner.component.html',
  styleUrls: ['./join-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinBannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
