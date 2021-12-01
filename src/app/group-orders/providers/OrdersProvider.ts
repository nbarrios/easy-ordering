/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/firebase.service';
import { GroupOrder } from '../models/GroupOrder';
import { Member, OrderStatus } from '../models/Members';
import { Order } from '../models/Order';


@Injectable()
export class OrdersProvider {
  activeOrders: AngularFirestoreCollection<GroupOrder> = null;
  completedOrders: AngularFirestoreCollection<GroupOrder> = null;

  constructor(
    public fireservice: FirebaseService,
    public firestore: AngularFirestore
  ) {
    this.activeOrders = this.firestore.collection<GroupOrder>('orders',
      ref => ref.where('owner', '==', this.fireservice.getUserID())
      .where('completed', '==', false));
    this.completedOrders = this.firestore.collection<GroupOrder>('orders',
      ref => ref.where('owner', '==', this.fireservice.getUserID())
      .where('completed', '==', true));
  }

  public getAllPreviousOrders(): Observable<GroupOrder[]> {
    return this.completedOrders.valueChanges({idField: 'docID'});
  }

  public getAllActiveOrders(): Observable<GroupOrder[]> {
    return this.activeOrders.valueChanges({idField: 'docID'});
  }

  public getOrder(id: string): Observable<GroupOrder>{
    return this.firestore.collection<GroupOrder>('orders').doc(id).valueChanges();
  }
}
