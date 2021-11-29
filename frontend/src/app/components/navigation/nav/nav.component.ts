import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import configs from '@app/configs';
import { AuthService } from '@services/auth/auth.service';
import { User } from '@interfaces/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  links: any[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  dropdownActive: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }

  ngOnInit(): void {
    this.setNavigationMenuItems();
  }

  setNavigationMenuItems() {
    if (this.authService.isAuthenticated()) {
      this.links = configs.navigation.landing.authenticated;
    } else {
      this.links = configs.navigation.landing.noauth;
    }
  }
}
