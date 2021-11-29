import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { PlaidLinkHandler } from 'ngx-plaid-link/lib/ngx-plaid-link-handler';
// import { PlaidConfig } from 'ngx-plaid-link/lib/interfaces';
import { environment } from 'src/environments/environment';
// import { NgxPlaidLinkService } from 'ngx-plaid-link';
import { ApiService } from '@services/api/api.service';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-plaid',
  templateUrl: './plaid.component.html',
  styleUrls: ['./plaid.component.scss']
})
export class PlaidComponent {

  // private plaidLinkHandler: PlaidLinkHandler;

  // private config: PlaidConfig = {
  //   ...environment.plaid_default_config,
  //   onSuccess: this.onSuccess,
  //   onExit: this.onExit
  // };

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    // private plaidLinkService: NgxPlaidLinkService
  ) { }

  showPlaidModal() {
    //   this.plaidLinkService
    //     .createPlaid(
    //       Object.assign({}, this.config, {
    //         onSuccess: (token, metadata) => this.onSuccess(token, metadata),
    //         onExit: (error, metadata) => this.onExit(error, metadata),
    //         onEvent: (eventName, metadata) => this.onEvent(eventName, metadata)
    //       })
    //     )
    //     .then((handler: PlaidLinkHandler) => {
    //       this.plaidLinkHandler = handler;
    //       this.plaidLinkHandler.open();
    //     });
  }

  onSuccess(token, metadata) {
    //   this.authService.setHasPlaidToken(true);
    //   this.apiService.post('/api/access-token', {
    //     publicToken: token
    //   }).subscribe((response: any) => {
    //     this.router.navigate(['/employer-dashboard']);
    //   });
  }

  onEvent(eventName, metadata) {
  }

  onExit(error, metadata) {
  }
}
