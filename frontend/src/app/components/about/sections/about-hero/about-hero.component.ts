import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'about-hero',
  templateUrl: './about-hero.component.html',
  styleUrls: ['./about-hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutHeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
