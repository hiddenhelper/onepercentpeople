import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hero-icon',
  templateUrl: './hero-icon.component.html',
  styleUrls: ['./hero-icon.component.scss']
})
export class HeroIconComponent implements OnInit {

  /**
   * The name of the icon to display.
   * Ex: "user"
   * Solid variants end in -solid. Ex: "user-solid".
   */
  @Input() icon: string;


  /**
   * Classes to apply to the <svg>
   */
  @Input() icon_class: string;

  /**
   * The base path of where the Hero icons live.
   */
  heroIconPath: string = "assets/images/icons/hero/"

  /**
   * The fully constructed path to the icon svg file.
   */
  iconFilePath: string = ""

  constructor() { }

  ngOnInit(): void {
    this.iconFilePath = `${this.heroIconPath}${this.icon}.svg`;
    if (!this.icon_class)
      this.icon.includes("solid") ? this.icon_class = "w-5 h-5" : this.icon_class = "w-6 h-6";
  }

}
