import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then(m => m.FoodModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
