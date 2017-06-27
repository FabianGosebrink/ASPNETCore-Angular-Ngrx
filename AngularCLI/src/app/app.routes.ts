import { AuthGuard } from './shared/guards/authentication.guard';
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'food', loadChildren: './food/food.module#FoodModule', canLoad: [AuthGuard] },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  {
    path: '**',
    redirectTo: 'home'
  }
];
