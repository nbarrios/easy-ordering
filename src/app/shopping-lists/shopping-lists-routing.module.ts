import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListsPage } from './shopping-lists.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingListsPage
  },
  { //not working
    path: 'view/:listId',
    loadChildren: () => import('../shopping-lists/view-shopping-list/view-shopping-list.module').then(m => m.ViewShoppingListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListsPageRoutingModule {}
