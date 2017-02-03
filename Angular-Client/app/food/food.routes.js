"use strict";
var foodDetails_component_1 = require('./components/foodDetails/foodDetails.component');
var mainFood_component_1 = require('./components/mainFood/mainFood.component');
exports.FoodRoutes = [
    { path: 'food', component: mainFood_component_1.MainFoodComponent },
    { path: 'food/:foodId', component: foodDetails_component_1.FoodDetailsComponent }
];
//# sourceMappingURL=food.routes.js.map