import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListsPageRoutingModule } from './shopping-lists-routing.module';

import { ShoppingListsPage } from './shopping-lists.page';
import { PopoverService } from './popover/popover.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingListsPageRoutingModule
  ],
  declarations: [ShoppingListsPage],
  providers: [PopoverService]
})
export class ShoppingListsPageModule {}
