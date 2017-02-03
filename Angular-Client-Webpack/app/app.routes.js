export var AppRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'food', loadChildren: './food/food.module#FoodModule' },
    {
        path: '**',
        redirectTo: 'home'
    }
];
//# sourceMappingURL=app.routes.js.map