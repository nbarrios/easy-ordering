import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ActiveOrdersProvider } from './providers/ActiveOrdersProvider';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PreviousOrdersProvider } from './providers/previousOrdersProvider';
import { PreviousOrderComponent } from './components/previous-order/previous-order.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  declarations: [
    Tab1Page,
    PreviousOrderComponent
  ],
  entryComponents: [
  ],
  providers: [
    ActiveOrdersProvider,
    PreviousOrdersProvider
  ]
})

export class Tab1PageModule {}
