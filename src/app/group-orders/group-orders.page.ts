import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { EOOrder } from './models/EOOrder';
import { OrdersProvider } from './providers/OrdersProvider';


@Component({
  selector: 'app-grouporders',
  templateUrl: 'group-orders.page.html',
  styleUrls: ['group-orders.page.scss']
})
export class GroupOrdersPage implements OnInit {

  @ViewChild('activeOrders', {read: ViewContainerRef}) container: ViewContainerRef;

  activeOrders: EOOrder[] = null;

  previousOrders: EOOrder[] = null;


  constructor(
    private ordersProvider: OrdersProvider,
    public router: Router
  ) {}


  public showOrder(order: EOOrder){

  }

  startNewOrder() {
    this.router.navigateByUrl('/new-order');
  }

  ngOnInit(){
    this.ordersProvider.getAllActiveOrders().subscribe(val => {
      this.activeOrders = val;
    });
    this.ordersProvider.getAllPreviousOrders().subscribe(val => {
      this.previousOrders = val;
    });
  }

}
