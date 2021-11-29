import { Component, OnInit } from '@angular/core';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
// import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  current_year: number;
  // faTwitter = faTwitter;
  // faFacebook = faFacebook;
  // faInstagram = faInstagram;


  constructor() { }

  ngOnInit(): void {
    this.getCurrentYear();
  }

  getCurrentYear(): void {
    this.current_year = new Date().getFullYear();
  }

}
