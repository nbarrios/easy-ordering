import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { EOOrder } from '../group-orders/models/EOOrder';

export interface Order {
    restaurantName: string;
    restaurantAddress: string;
    restaurantWebsite: string;
    groupMesssage: string;
    paymentInfoPaypal: string;
    paymentInfoVenmo: string;
    paymentInfoCash: string;
    pickupTime: string;
    owner: string;
    users: Array<string>;
}

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss'],
})
export class NewOrderPage implements OnInit {
  newOrderForm: FormGroup;
  submitted = false;
  submissionError = false;
  user: firebase.default.User = null;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
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
      pickupTime: [Date.now()]
    });
    this.auth.user.subscribe((value: firebase.default.User) => {
      this.user = value;
    });
  }

  onPaymentToggle($event) {
    console.log($event.target.checked);
  }

  onSubmit() {
    this.submitted = true;
    this.submissionError = false;

    if (this.newOrderForm.valid && this.user) {
      const values = this.newOrderForm.value;
      const orders = this.firestore.collection<EOOrder>('orders');
      orders.add({
        restaurantName: values.restaurantName,
        restaurantAddress: values.restaurantAddress,
        restaurantWebsite: values.restaurantWebsite,
        groupMesssage: values.groupMessage,
        paymentInfoPaypal: values.paymentInfoPaypal,
        paymentInfoVenmo: values.paymentInfoVenmo,
        paymentInfoCash: values.paymentInfoCash,
        pickupTime: values.pickupTime,
        owner: this.user.uid,
        users: new Array<string>()
      }).then(val => {
        this.router.navigateByUrl('/tabs/group-orders');
      }, err => {
        this.submissionError = true;
      });
    }
  }

}
