"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./components/home/home.component');
var mainFood_component_1 = require('./components/mainFood/mainFood.component');
var foodDetails_component_1 = require('./components/foodDetails/foodDetails.component');
var appRoutes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'food', component: mainFood_component_1.MainFoodComponent },
    { path: 'food/:foodId', component: foodDetails_component_1.FoodDetailsComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map