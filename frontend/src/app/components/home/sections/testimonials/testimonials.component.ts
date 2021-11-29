import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'home-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
