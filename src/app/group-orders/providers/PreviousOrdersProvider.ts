import { Injectable } from '@angular/core';
import { Members, OrderStatus } from '../models/Members';
import { OrderDetail } from '../models/OrderDetail';

@Injectable()
export class PreviousOrdersProvider{

    private userStatus: Members[] = [
      new Members('Jimmy', OrderStatus.filled),
      new Members('Sal', OrderStatus.filled),
      new Members('Meg', OrderStatus.notFilled),
      new Members('Rooster', OrderStatus.notFilled)
    ];
    private ordersList: OrderDetail = new OrderDetail(
      'McDonald\'s', 'assets/icons/order-icon.svg', this.userStatus, 'Empty message group', '11/02/2020');

    private userStatus1: Members[] = [
      new Members('Mike', OrderStatus.filled),
      new Members('Rooster', OrderStatus.filled),
      new Members('Vero', OrderStatus.notFilled),
      new Members('Tim', OrderStatus.notFilled),
      new Members('Lawrence', OrderStatus.notFilled),
      new Members('Jasmine', OrderStatus.notFilled)
    ];
    private ordersList1: OrderDetail = new OrderDetail(
      'King\'s Burger', 'assets/icons/order-icon.svg', this.userStatus, 'Empty message group', '10/14/2020');

    private userStatus2: Members[] = [
      new Members('Khang', OrderStatus.filled),
      new Members('Paul', OrderStatus.filled),
      new Members('Mike', OrderStatus.notFilled),
      new Members('Vero', OrderStatus.notFilled),
      new Members('Tim', OrderStatus.notFilled),
      new Members('Lawrence', OrderStatus.notFilled)
  ];
    private ordersList2: OrderDetail = new OrderDetail(
      'Mama Hong', 'assets/icons/order-icon.svg', this.userStatus, 'Empty message group', '10/14/2020');


  public getPreviousOrders(): OrderDetail[]{
    const ordersList: OrderDetail[] = [this.ordersList, this.ordersList1, this.ordersList2];
    return ordersList;
  }
}
