import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { MainFoodComponent } from './components/mainFood/mainFood.component';

import { Routes } from '@angular/router';

export const FoodRoutes: Routes = [
    {
        path: '', component: MainFoodComponent
    },
    {
        path: ':foodId', component: FoodDetailsComponent
    }
];
