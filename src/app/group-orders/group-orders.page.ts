import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { GroupOrder } from './models/GroupOrder';
import { OrdersProvider } from './providers/OrdersProvider';


@Component({
  selector: 'app-grouporders',
  templateUrl: 'group-orders.page.html',
  styleUrls: ['group-orders.page.scss']
})
export class GroupOrdersPage implements OnInit {

  @ViewChild('activeOrders', {read: ViewContainerRef}) container: ViewContainerRef;

  activeOrders: GroupOrder[] = null;
  previousOrders: GroupOrder[] = null;

  constructor(
    private ordersProvider: OrdersProvider,
    public router: Router
  ) {}

  public showOrder(order: GroupOrder) {

  }

  startNewOrder() {
    this.router.navigateByUrl('/new-order');
  }

  ngOnInit() {
    this.ordersProvider.getAllActiveOrders().subscribe(val => {
      this.activeOrders = val;
    });
    this.ordersProvider.getAllPreviousOrders().subscribe(val => {
      this.previousOrders = val;
    });
  }

}
