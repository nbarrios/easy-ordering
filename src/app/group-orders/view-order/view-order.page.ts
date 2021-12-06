/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GroupOrder } from '../models/GroupOrder';
import { UserOrder } from '../models/UserOrder';
import { OrderStatus } from '../models/Members';
import { IonItemSliding, IonTextarea } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OrdersProvider } from '../providers/OrdersProvider';
import { GroupOrdersPage } from '../group-orders.page';
import { FirebaseService } from 'src/app/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { instanceToPlain } from 'class-transformer';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {
  @ViewChild('userInput') userInput: IonTextarea;
  @ViewChild('userPickupList') userPickupList: IonItemSliding;

  // current order showing on screen
  orderId: string;
  order: GroupOrder;
  // used for comparison
  filled = OrderStatus.filled;
  // current user info
  userOrder: UserOrder;
  userId: string;
  hideCurrentUserOrder = true;
  hideInputOrder = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersProvider: OrdersProvider,
    private firestore: AngularFirestore,
    private fireservice: FirebaseService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('orderId')) {
        return;
      }
      this.orderId = paramMap.get('orderId');
      this.ordersProvider.getOrder(this.orderId).subscribe(val => {
        this.order = val;
        this.userId = this.fireservice.getUserID();
        if (this.order.orders.hasOwnProperty(this.userId)) {
          this.userOrder = this.order.orders[this.userId];
        } else {
          this.userOrder = new UserOrder();
        }
        this.setupUI();
      });
    });
  }

  updateUserOrder(inputOrder: string) {
    this.userOrder.order = inputOrder;
    this.userOrder.status = OrderStatus.filled;

    this.order.orders[this.userId] = this.userOrder;
    this.firestore.collection('orders').doc(this.orderId).update(instanceToPlain(this.order)).then(val => {
      //
    }, err => {
      console.log(err);
    });
    this.setupUI();
  }

  modifyCurrentUserOrder() {
    this.userInput.value = this.userOrder.order;
    this.hideInputOrder = false;
    this.userPickupList.closeOpened();
  }

  deleteCurrentUserOrder() {
    this.userInput.value = '';
    // Close the options in UI
    this.userPickupList.closeOpened();
    // update order
    this.userOrder.order = '';
    this.userOrder.status = OrderStatus.notFilled;
    this.setupUI();
  }

  // Hide or show input field when loading the page based if the current user filled his list
  private setupUI(){
    if (this.order.completed || this.userOrder.status === OrderStatus.filled){
      this.hideCurrentUserOrder = false;
      this.hideInputOrder = true;
    }else{
      this.hideCurrentUserOrder = true;
      this.hideInputOrder = false;
    }
  }
}
