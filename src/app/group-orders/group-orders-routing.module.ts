import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupOrdersPage } from './group-orders.page';

const routes: Routes = [
  {
    path: '',
    component: GroupOrdersPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupOrdersPageRoutingModule {}
