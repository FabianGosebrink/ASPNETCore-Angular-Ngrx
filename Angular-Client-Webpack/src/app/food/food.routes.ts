import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { MainFoodComponent } from './components/mainFood/mainFood.component';

import { Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/authentication.guard';

export const FoodRoutes: Routes = [
    {
        path: '', component: MainFoodComponent, canActivate: [AuthGuard]
    },
    {
        path: ':foodId', component: FoodDetailsComponent, canActivate: [AuthGuard]
    }
];
