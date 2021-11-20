import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewShoppingListPage } from './view-shopping-list.page';

const routes: Routes = [
  {
    path: '',
    component: ViewShoppingListPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewShoppingListPageRoutingModule {}
