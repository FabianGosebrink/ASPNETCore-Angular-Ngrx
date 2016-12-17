import { HomeComponent } from './components/home/home.component';
import { MainFoodComponent } from './components/mainFood/mainFood.component';
import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
export var AppRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'food', component: MainFoodComponent },
    { path: 'food/:foodId', component: FoodDetailsComponent }
];
