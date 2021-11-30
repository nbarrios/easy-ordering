import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseUserData } from 'src/app/firebase.service';
import { GroupOrder } from '../../models/GroupOrder';

@Component({
  selector: 'app-previous-order',
  templateUrl: './previous-order.component.html',
  styleUrls: ['./previous-order.component.scss'],
})
export class PreviousOrderComponent implements OnInit {
  @Input() order: GroupOrder;
  @Input() userMap: Map<string, string> = new Map();

  constructor(public firestore: AngularFirestore) {}

  ngOnInit() {
    for (const order of this.order.orders) {
      this.firestore.collection<FirebaseUserData>('users').doc(order.user)
        .valueChanges().subscribe(val => {
          this.userMap.set(order.user, (val.name && val.name.length > 0) ? val.name : val.email);
        });
    }
  }
}
