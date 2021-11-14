import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {
  newOrderForm: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.newOrderForm = this.formBuilder.group({
      restaurantName: ['', Validators.required],
      detailedRestaurantInfo: [false],
      restaurantAddress: [''],
      restaurantWebsite: [''],
      groupMessage: [''],
      sendPaymentInfo: [false],
      paymentInfoPaypal: [''],
      paymentInfoPaypalToggle: [false],
      paymentInfoVenmo: [''],
      paymentInfoVenmoToggle: [false],
      paymentInfoCash: [''],
      paymentInfoCashToggle: [false],
      pickupTime: []
    });
  }

  onPaymentToggle($event) {
    console.log($event.target.checked);
  }

  onSubmit() {
    console.log(this.newOrderForm.value);
  }

  toPlaceOrder() {
    this.router.navigateByUrl('/placeorder');
  }

}
