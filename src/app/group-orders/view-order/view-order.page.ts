/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Order } from '../models/Order';
import { Member } from '../models/Members';
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
  order: Order;
  // used for comparison
  filled = OrderStatus.filled;

  // current user info
  userOrder: Member;
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
      this.order = this.ordersProvider.getOrder(orderId);
      // using the first user, with userId from the list just for demo purposes
      this.userOrder = this.order.members[0];
      this.userId = this.userOrder.userId;
      this.setupUI();
    });
  }

  updateUserOrder(inputOrder: string) {
    // split string into multiple lines, and removes empty lines
    let list = inputOrder.split('\n');
    list = list.filter((item) => item !== '');
    if (inputOrder && inputOrder.length > 0 && list.length !== 0) {
      this.userOrder.pickupList = list;
      this.userOrder.orderStatus = OrderStatus.filled;
    }

    this.hideUserPickupList = false;
    this.hideInputOrder = true;
  }

  modifyUserList() {
    //TODO update order in database
    // Copies list to input
    let listToString = '';
    for(let i = 0; i < this.userOrder.pickupList.length; i++){
      listToString = listToString + this.userOrder.pickupList[i] + '\n';
    }
    
    this.userInput.value = listToString;
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
    this.userOrder.pickupList = [];
    this.userOrder.orderStatus = OrderStatus.notFilled;
  }

  // Hide or show input field when loading the page based if the current user filled his list
  private setupUI(){
    if(this.userOrder.orderStatus === OrderStatus.filled){
      this.hideUserPickupList = false;
      this.hideInputOrder = true;
    }else{
      this.hideUserPickupList = true;
      this.hideInputOrder = false;
    }
  }
}
