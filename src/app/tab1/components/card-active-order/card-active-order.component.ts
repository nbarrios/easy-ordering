import { Component, OnInit, Input } from '@angular/core';
import { OrderDetail } from '../../models/OrderDetail';

@Component({
  selector: 'app-card-active-order',
  templateUrl: './card-active-order.component.html',
  styleUrls: ['./card-active-order.component.scss'],
})
export class CardActiveOrderComponent implements OnInit {

  @Input() order: OrderDetail;

  ngOnInit() {}

}
