import { AuthGuard } from '../shared/guards/authentication.guard';
import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { MainFoodComponent } from './components/mainFood/mainFood.component';
export var FoodRoutes = [
    {
        path: '', component: MainFoodComponent, canActivate: [AuthGuard]
    },
    {
        path: ':foodId', component: FoodDetailsComponent, canActivate: [AuthGuard]
    }
];
//# sourceMappingURL=food.routes.js.map