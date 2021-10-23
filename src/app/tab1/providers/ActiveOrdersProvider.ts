import { Injectable } from '@angular/core';
import { OrderDetail } from '../models/OrderDetail';
import { Members, OrderStatus } from '../models/Members';

@Injectable()
export class ActiveOrdersProvider{

    private userStatus: Members[] = [
        new Members('Jerry', OrderStatus.filled),
        new Members('Samantha', OrderStatus.filled),
        new Members('Clarice', OrderStatus.notFilled),
        new Members('Muhammad', OrderStatus.notFilled),
        new Members('Carlos', OrderStatus.declined)
    ];
    private ordersList: OrderDetail = new OrderDetail(
      'Northern Cafe', 'assets/icons/order-icon.svg',
       this.userStatus, 'We\'re sharing a soup...', 'Today');
    constructor(){}

    // Gets list of Cards
    getActiveOrders(): OrderDetail[]{
        const list: OrderDetail[] = [this.ordersList];

        return list;
    }
}
