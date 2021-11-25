import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'group-orders',
        loadChildren: () => import('../group-orders/group-orders.module').then(m => m.GroupOrdersPageModule)
      },
      {
        path: 'group-orders/:orderId',
        loadChildren: () => import('../group-orders/view-order/view-order.module').then(m => m.ViewOrderPageModule)
      },
      {
        path: 'shopping-lists',
        loadChildren: () => import('../shopping-lists/shopping-lists.module').then(m => m.ShoppingListsPageModule)
      },
      { //not working
        path: 'shopping-lists/view/',
        loadChildren: () => import('../shopping-lists/view-shopping-list/view-shopping-list.module').then(m => m.ViewShoppingListPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/group-orders',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/group-orders',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
