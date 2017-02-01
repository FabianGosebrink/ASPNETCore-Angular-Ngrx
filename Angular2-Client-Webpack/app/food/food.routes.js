import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { MainFoodComponent } from './components/mainFood/mainFood.component';
export var FoodRoutes = [
    {
        path: '', component: MainFoodComponent
    },
    {
        path: ':foodId', component: FoodDetailsComponent
    }
];
//# sourceMappingURL=food.routes.js.map