import { MainFoodComponent } from './food/components/mainFood/mainFood.component';
import { HomeComponent } from './home/components/home/home.component';
import { Routes } from '@angular/router';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'food', loadChildren: 'app/food/food.module#FoodModule' },
];
