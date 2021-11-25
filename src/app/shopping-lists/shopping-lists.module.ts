import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingListsPageRoutingModule } from './shopping-lists-routing.module';

import { ShoppingListsPage } from './shopping-lists.page';
import { PopoverService } from './popover/popover.service';
import { PopoverComponent } from './popover/popover.component';
import { ChangeAccessModalComponent } from './change-access-modal/change-access-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingListsPageRoutingModule
  ],
  declarations: [ShoppingListsPage, PopoverComponent, ChangeAccessModalComponent],
  providers: [PopoverService],
})
export class ShoppingListsPageModule {}
