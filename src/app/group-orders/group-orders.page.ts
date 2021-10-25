import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetail } from './models/OrderDetail';
import { ActiveOrdersProvider } from './providers/ActiveOrdersProvider';
import { PreviousOrdersProvider } from './providers/previousOrdersProvider';


@Component({
  selector: 'app-grouporders',
  templateUrl: 'group-orders.page.html',
  styleUrls: ['group-orders.page.scss']
})
export class GroupOrdersPage implements OnInit {

  @ViewChild('activeOrders', {read: ViewContainerRef}) container: ViewContainerRef;

  activeOrders: OrderDetail[] = this.ordersProvider.getActiveOrders();
 // orderDetail: OrderDetail = this.activeOrders[0];
 // members: Members[] = this.orderDetail.members;

  previousOrders: OrderDetail[] = this.pOrdersProvider.getPreviousOrders();


  constructor(
    private ordersProvider: ActiveOrdersProvider,
    private pOrdersProvider: PreviousOrdersProvider,
    public router: Router
  ) {}


  public showOrder(order: OrderDetail){

  }

  startNewOrder() {
    this.router.navigateByUrl('/neworder');
  }

  ngOnInit(){
  }

}
