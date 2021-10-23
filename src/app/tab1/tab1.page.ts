import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { OrderDetail } from './models/OrderDetail';
import { Members, OrderStatus } from './models/Members';
import { ActiveOrdersProvider } from './providers/ActiveOrdersProvider';
import { NavController } from '@ionic/angular';
import { PreviousOrdersProvider } from './providers/previousOrdersProvider';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  @ViewChild('activeOrders', {read: ViewContainerRef}) container: ViewContainerRef;

  activeOrders: OrderDetail[] = this.ordersProvider.getActiveOrders();
  orderDetail: OrderDetail = this.activeOrders[0];
  members: Members[] = this.orderDetail.members;

  previousOrders: OrderDetail[] = this.pOrdersProvider.getPreviousOrders();

  filled = OrderStatus.filled;
  notFilled = OrderStatus.notFilled;
  declined = OrderStatus.declined;

  constructor(
    public navCtrl: NavController,
    private ordersProvider: ActiveOrdersProvider,
    private resolver: ComponentFactoryResolver,
    private pOrdersProvider: PreviousOrdersProvider
  ) {}


  public showOrder(order: OrderDetail){

  }

  ngOnInit(){
  }

}
