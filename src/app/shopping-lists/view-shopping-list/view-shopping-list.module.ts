import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewShoppingListPage } from './view-shopping-list.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ViewShoppingListPageRoutingModule } from './view-shopping-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ViewShoppingListPageRoutingModule
  ],
  declarations: [ViewShoppingListPage]
})
export class ViewShoppingListPageModule {}
