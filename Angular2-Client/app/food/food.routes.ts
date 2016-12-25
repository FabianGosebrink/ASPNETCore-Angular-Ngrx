import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { MainFoodComponent } from './components/mainFood/mainFood.component';

import { Routes } from '@angular/router';

export const FoodRoutes: Routes = [
    { path: 'food', component: MainFoodComponent },
    { path: 'food/:foodId', component: FoodDetailsComponent }
];
