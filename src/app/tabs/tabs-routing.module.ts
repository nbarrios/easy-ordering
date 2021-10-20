import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'signup',
        loadChildren: () => import('../signup/signup.module').then(m => m.SignupPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../new-order/new-order.module').then(m => m.NewOrderPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
