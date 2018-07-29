import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/authentication.guard';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { MainFoodComponent } from './components/main-food/main-food.component';
import * as fromFoodGuards from './guards';

export const FoodRoutes: Routes = [
  {
    path: '',
    component: MainFoodComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':foodId',
    component: FoodDetailsComponent,
    canActivate: [AuthGuard, fromFoodGuards.FoodIsLoadedGuard]
  }
];
