import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewOrderPageRoutingModule } from './new-order-routing.module';

import { NewOrderPage } from './new-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewOrderPageRoutingModule
  ],
  declarations: [NewOrderPage]
})
export class NewOrderPageModule {}
