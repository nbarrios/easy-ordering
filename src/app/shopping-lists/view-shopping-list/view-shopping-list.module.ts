import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewShoppingListPage } from './view-shopping-list.page';

import { ViewShoppingListPageRoutingModule } from './view-shopping-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ViewShoppingListPageRoutingModule
  ],
  declarations: [ViewShoppingListPage]
})
export class ViewShoppingListPageModule {}
