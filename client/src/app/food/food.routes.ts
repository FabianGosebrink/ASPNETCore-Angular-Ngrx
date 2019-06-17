import { Routes } from '@angular/router';
import * as components from './container';
import * as fromFoodGuards from './guards';

export const FoodRoutes: Routes = [
  {
    path: '',
    component: components.MainFoodComponent,
  },
  {
    path: ':foodId',
    component: components.FoodDetailsComponent,
    canActivate: [fromFoodGuards.FoodIsLoadedGuard],
  },
];
