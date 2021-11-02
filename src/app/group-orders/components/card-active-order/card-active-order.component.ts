import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-card-active-order',
  templateUrl: './card-active-order.component.html',
  styleUrls: ['./card-active-order.component.scss'],
})
export class CardActiveOrderComponent implements OnInit {

  @Input() order: Order;

  ngOnInit() {}

}
