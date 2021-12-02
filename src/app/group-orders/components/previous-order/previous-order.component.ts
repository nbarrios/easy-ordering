import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService, FirebaseUserData } from 'src/app/firebase.service';
import { GroupOrder } from '../../models/GroupOrder';

@Component({
  selector: 'app-previous-order',
  templateUrl: './previous-order.component.html',
  styleUrls: ['./previous-order.component.scss'],
})
export class PreviousOrderComponent implements OnInit {
  @Input() order: GroupOrder;
  userCount = 0;

  constructor(
    public firestore: AngularFirestore,
    public fireservice: FirebaseService
  ) {}

  ngOnInit() {
    this.userCount = Object.keys(this.order.orders).length;
  }
}
