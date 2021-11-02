import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Order } from '../../models/Order';
import { OrderStatus } from '../../models/Members';

@Component({
  selector: 'app-previous-order',
  templateUrl: './previous-order.component.html',
  styleUrls: ['./previous-order.component.scss'],
})
export class PreviousOrderComponent {


  //@Output() showRequest: EventEmitter<OrderDetail> = new EventEmitter<OrderDetail>();
  @Input() order: Order;


  /*showOrder(){
      this.showRequest.emit(this.order);
  }*/
}
