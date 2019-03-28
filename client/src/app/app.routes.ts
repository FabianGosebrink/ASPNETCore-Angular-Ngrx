import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/authentication.guard';
import { RegisterComponent } from './register/register.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { CustomerComponent} from './customers';

import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerEditReactiveComponent } from './customers/customer-edit-reactive.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  {
    path: 'food',
    loadChildren: './food/food.module#FoodModule',
    canLoad: [AuthGuard]
  },
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'register', component: RegisterComponent },
  { path: 'ingredients', component: IngredientsComponent },
  { path: 'customers', component: CustomerComponent },
//  { path: 'customers/:id', component: CustomerEditReactiveComponent },
 { path: 'customer-edit/:id', component: CustomerEditComponent},
  {
    path: '**',
    redirectTo: 'home'
  }
];
