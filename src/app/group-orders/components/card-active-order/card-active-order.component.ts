import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService, FirebaseUserData } from 'src/app/firebase.service';
import { GroupOrder } from '../../models/GroupOrder';
import { OrderStatus } from '../../models/Members';

@Component({
  selector: 'app-card-active-order',
  templateUrl: './card-active-order.component.html',
  styleUrls: ['./card-active-order.component.scss'],
})
export class CardActiveOrderComponent implements OnInit {
  @Input() order: GroupOrder;

  constructor(
    public firestore: AngularFirestore,
    public fireservice: FirebaseService
  ) {}

  ngOnInit() {
  }

  iconForUserOrder(user: string): string {
    if (this.order.orders.hasOwnProperty(user)) {
      const userOrder = this.order.orders[user];
      if (userOrder.status === OrderStatus.filled) { return 'checkmark-outline'; }
    }
    return 'close-outline';
  }

  colorForUserOrder(user: string): string {
    if (this.order.orders.hasOwnProperty(user)) {
      const userOrder = this.order.orders[user];
      if (userOrder.status === OrderStatus.filled) { return 'green'; }
    }
    return 'red';
  }
}
