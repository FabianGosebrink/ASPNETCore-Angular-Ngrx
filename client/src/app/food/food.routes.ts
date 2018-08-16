import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/authentication.guard';
import * as components from './container';
import * as fromFoodGuards from './guards';

export const FoodRoutes: Routes = [
  {
    path: '',
    component: components.MainFoodComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':foodId',
    component: components.FoodDetailsComponent,
    canActivate: [AuthGuard, fromFoodGuards.FoodIsLoadedGuard],
  },
];
