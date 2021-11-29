import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'home-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
