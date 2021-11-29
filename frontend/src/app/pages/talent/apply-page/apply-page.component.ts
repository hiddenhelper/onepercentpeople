import { Component, OnInit } from '@angular/core';
import { SeoService } from '@services/seo/seo.service';

@Component({
  templateUrl: './apply-page.component.html',
  styleUrls: ['./apply-page.component.scss']
})
export class ApplyPageComponent implements OnInit {

  /**
   * Meta title for the page.
   */
  title: string = "Apply";

  constructor(
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.seoService.setTitle(this.title);
  }

}
