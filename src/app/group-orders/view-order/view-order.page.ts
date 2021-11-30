/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GroupOrder } from '../models/GroupOrder';
import { UserOrder } from '../models/UserOrder';
import { OrderStatus } from '../models/Members';
import { IonItemSliding, IonTextarea } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OrdersProvider } from '../providers/OrdersProvider';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {
  @ViewChild('userInput') userInput: IonTextarea;
  @ViewChild('userPickupList') userPickupList: IonItemSliding;

  // current order showing on screen
  order: GroupOrder;
  // used for comparison
  filled = OrderStatus.filled;

  // current user info
  userOrder: UserOrder;
  userId: string;
  hideUserPickupList = true;
  hideInputOrder = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ordersProvider: OrdersProvider
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('orderId')) {
        return;
      }
      const orderId = paramMap.get('orderId');
      this.ordersProvider.getOrder(orderId).subscribe(val => {
        this.order = val;
        this.userOrder = this.order.orders[0];
        // using the first user, with userId from the list just for demo purposes
        this.userId = this.order.owner;
      });
      this.setupUI();
    });
  }

  updateUserOrder(inputOrder: string) {
    this.userOrder.order = inputOrder;
    this.userOrder.status = OrderStatus.filled;

    this.hideUserPickupList = false;
    this.hideInputOrder = true;
  }

  modifyUserList() {
    this.userInput.value = this.userOrder.order;
    this.hideInputOrder = false;
    this.userPickupList.closeOpened();
  }

  deleteUserList() {
    //TODO update order in database
    this.userInput.value = '';
    this.hideUserPickupList = true;
    this.hideInputOrder = false;
    // Close the options in UI
    this.userPickupList.closeOpened();
    // update order
    this.userOrder.order = '';
    this.userOrder.status = OrderStatus.notFilled;
  }

  // Hide or show input field when loading the page based if the current user filled his list
  private setupUI(){
    if(this.userOrder.status === OrderStatus.filled){
      this.hideUserPickupList = false;
      this.hideInputOrder = true;
    }else{
      this.hideUserPickupList = true;
      this.hideInputOrder = false;
    }
  }
}
