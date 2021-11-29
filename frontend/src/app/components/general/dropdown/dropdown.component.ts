import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  /**
   * The state fo the dropdown.
   */
  open: boolean = false;

  @Input() title: string = "";

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  toggleDropdown(): void {
    this.open = !this.open;
  }

  @HostListener('document:click', ['$event.target'])
  public onPageClick(targetElement) {
    if (this.open) {
      const clickedInside = this.elementRef.nativeElement.contains(targetElement);
      if (!clickedInside) {
        this.open = false;
      }
    }
  }

}
