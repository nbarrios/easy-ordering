import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from './models/Order';
//import { ActiveOrdersProvider } from './providers/ActiveOrdersProvider';
//import { PreviousOrdersProvider } from './providers/previousOrdersProvider';
import { OrdersProvider } from './providers/OrdersProvider';


@Component({
  selector: 'app-grouporders',
  templateUrl: 'group-orders.page.html',
  styleUrls: ['group-orders.page.scss']
})
export class GroupOrdersPage implements OnInit {

  @ViewChild('activeOrders', {read: ViewContainerRef}) container: ViewContainerRef;

  activeOrders: Order[] = this.ordersProvider.getAllActiveOrders();

  previousOrders: Order[] = this.ordersProvider.getAllPreviousOrders();


  constructor(
    private ordersProvider: OrdersProvider,
    public router: Router
  ) {}


  public showOrder(order: Order){

  }

  startNewOrder() {
    this.router.navigateByUrl('/new-order');
  }

  ngOnInit(){
  }

}
