import { AuthGuard } from './shared/guards/authentication.guard';
export var AppRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'food', loadChildren: './food/food.module#FoodModule', canLoad: [AuthGuard] },
    { path: 'account', loadChildren: './account/account.module#AccountModule' },
    {
        path: '**',
        redirectTo: 'home'
    }
];
//# sourceMappingURL=app.routes.js.map