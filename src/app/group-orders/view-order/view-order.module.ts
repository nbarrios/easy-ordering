import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewOrderPageRoutingModule } from './view-order-routing.module';
import { ViewOrderPage } from './view-order.page';
import { OrdersProvider } from '../providers/OrdersProvider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOrderPageRoutingModule
  ],
  declarations: [
    ViewOrderPage
  ],
  providers: [
    OrdersProvider
  ]
})
export class ViewOrderPageModule {}
