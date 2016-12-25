"use strict";
var foodServiceMock_1 = require('./../../../../testing/foodServiceMock');
var food_dataservice_1 = require('./../../../shared/services/food.dataservice');
var home_component_1 = require('./home.component');
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/core/testing');
describe('HomeComponent', function () {
    var fixture;
    var comp;
    // async beforeEach
    beforeEach(testing_2.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [home_component_1.HomeComponent],
            providers: [
                { provide: food_dataservice_1.FoodDataService, useClass: foodServiceMock_1.FoodServiceMock }
            ]
        }).compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(home_component_1.HomeComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges(); // trigger initial data binding
    });
    afterEach(function () {
        fixture.destroy();
    });
    it('component should be instanciated', testing_1.inject([food_dataservice_1.FoodDataService], function (service) {
        expect(comp).toBeDefined();
    }));
    it('updatefood should be defined', testing_1.inject([food_dataservice_1.FoodDataService], function (service) {
        expect(comp.updateFood).toBeDefined();
    }));
    it('updatefood should call service --> getFood', testing_1.inject([food_dataservice_1.FoodDataService], function (service) {
        service.GetAllFood = jasmine.createSpy('GetAllFood').and.returnValue(service.GetAllFood());
        comp.updateFood();
        expect(service.GetAllFood).toHaveBeenCalledTimes(1);
    }));
    it('selectedFood should be one foodItem', testing_1.inject([food_dataservice_1.FoodDataService], function (service) {
        service.GetAllFood = jasmine.createSpy('GetAllFood').and.returnValue(service.GetAllFood());
        comp.updateFood();
        expect(comp.selectedFood).toBeDefined();
    }));
    it('lastupdatedTime should be set', testing_1.inject([food_dataservice_1.FoodDataService], function (service) {
        service.GetAllFood = jasmine.createSpy('GetAllFood').and.returnValue(service.GetAllFood());
        comp.updateFood();
        expect(comp.selectedFood).toBeDefined();
    }));
});
//# sourceMappingURL=home.component.spec.js.map