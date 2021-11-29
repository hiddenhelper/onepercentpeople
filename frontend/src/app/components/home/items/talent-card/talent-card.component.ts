import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'home-talent-card',
  templateUrl: './talent-card.component.html',
  styleUrls: ['./talent-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalentCardComponent implements OnInit {

  @Input() talent: any;

  constructor() { }

  ngOnInit(): void {
  }

}
