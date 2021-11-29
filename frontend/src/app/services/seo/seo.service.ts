import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import configs from '@app/configs';
const { seo } = configs;

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  /**
   * Set the page title content.
   * @param title
   */
  setTitle(title): void {
    title = seo.meta.title.replace('{title}', title);
    this.titleService.setTitle(title);
    this.metaTagService.updateTag(
      { name: 'title', content: title }
    );
  }

  /**
   * Set the description meta tag content.
   *
   * @param description
   */
  setDescription(description) {

    description = description.length > 0 ? description : seo.meta.description;

    this.metaTagService.updateTag(
      { name: 'description', content: description }
    );
  }
}
