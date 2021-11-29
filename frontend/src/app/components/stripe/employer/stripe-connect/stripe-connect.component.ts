import { Component, OnInit } from '@angular/core';
import { StripeService } from '@services/stripe/stripe.service';

@Component({
  selector: 'app-stripe-connect-employer',
  templateUrl: './stripe-connect.component.html',
  styleUrls: ['./stripe-connect.component.scss']
})
export class StripeConnectComponent implements OnInit {

  constructor(private stripeService: StripeService) { }

  viewStripeConnect() {
    console.log('View connect clicked');
    // TODO: User user stripe id
    this.stripeService.getStripeConnectLinks('user stripe id')
      .subscribe(data => {
        console.log('resp', data);
        if (data.error) {
          alert(data.error);
        } else {
          window.location = data.accountLinks.url;
        }
      }, error => {
        console.log(error);
      });

  }

  ngOnInit(): void {
  }

}
