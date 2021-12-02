import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService, FirebaseUserData } from 'src/app/firebase.service';
import { GroupOrder } from '../../models/GroupOrder';

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

  ngOnInit() {}

}
