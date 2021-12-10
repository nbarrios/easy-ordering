import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GroupOrder } from '../group-orders/models/GroupOrder';
import { FirebaseService } from '../firebase.service';
import { UserOrder } from '../group-orders/models/UserOrder';
import { instanceToPlain } from 'class-transformer';

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

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public fireservice: FirebaseService,
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
  }

  onPaymentToggle($event) {
  }

  onSubmit() {
    this.submitted = true;
    this.submissionError = false;

    if (this.newOrderForm.valid && this.fireservice.getUserID()) {
      const values = this.newOrderForm.value;
      const orders = this.firestore.collection('orders');
      const userOrders = new Map<string, UserOrder>();
      orders.add({
        restaurantName: values.restaurantName,
        restaurantAddress: values.restaurantAddress,
        restaurantWebsite: values.restaurantWebsite,
        groupMessage: values.groupMessage,
        paymentInfoPaypal: values.paymentInfoPaypal,
        paymentInfoVenmo: values.paymentInfoVenmo,
        paymentInfoCash: values.paymentInfoCash,
        pickupTime: values.pickupTime,
        completed: false,
        owner: this.fireservice.getUserID(),
        users: [this.fireservice.getUserID()],
        orders: instanceToPlain(userOrders)
      }).then(val => {
        navigator.clipboard.writeText('http://localhost:8100/tabs/group-orders/' + val.id).then(t => {
          this.router.navigateByUrl('/tabs/group-orders');
        });
      }, err => {
        this.submissionError = true;
      });
    }
  }

}
