import { Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/authentication.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'food', loadChildren: './food/food.module#FoodModule', canLoad: [AuthGuard] },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  {
    path: '**',
    redirectTo: 'home'
  }
];
