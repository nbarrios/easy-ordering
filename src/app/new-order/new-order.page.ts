import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {
  detailedRestaurantInfo = false;
  sendPaymentInfo = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  onPaymentToggle($event) {
    console.log($event.target.checked);
  }

  toPlaceOrder() {
    this.router.navigateByUrl('/placeorder');
  }

}
