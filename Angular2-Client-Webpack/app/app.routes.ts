import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'food', loadChildren: './food/food.module#FoodModule' },
  {
    path: '**',
    redirectTo: 'home'
  }
];
