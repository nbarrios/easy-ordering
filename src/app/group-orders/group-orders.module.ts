import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupOrdersPage } from './group-orders.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ActiveOrdersProvider } from './providers/ActiveOrdersProvider';
import { GroupOrdersPageRoutingModule } from './group-orders-routing.module';
import { PreviousOrdersProvider } from './providers/previousOrdersProvider';
import { PreviousOrderComponent } from './components/previous-order/previous-order.component';
import { CardActiveOrderComponent } from './components/card-active-order/card-active-order.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    GroupOrdersPageRoutingModule,
  ],
  declarations: [
    GroupOrdersPage,
    PreviousOrderComponent,
    CardActiveOrderComponent
  ],
  entryComponents: [
  ],
  providers: [
    ActiveOrdersProvider,
    PreviousOrdersProvider
  ]
})

export class GroupOrdersPageModule {}
