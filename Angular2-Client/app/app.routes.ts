import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from  './components/home/home.component';
import { MainFoodComponent } from  './components/mainFood/mainFood.component';
import { Configuration } from  './shared/app.configuration';
import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'food', component: MainFoodComponent },
  { path: 'food/:foodId', component: FoodDetailsComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);