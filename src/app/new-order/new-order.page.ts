import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {
  detailedRestaurantInfo = false;
  sendPaymentInfo = false;

  constructor() { }

  ngOnInit() {
  }

  onPaymentToggle($event) {
    console.log($event.target.checked);
  }

}
