import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'home-talent-map',
  templateUrl: './talent-map.component.html',
  styleUrls: ['./talent-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TalentMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
