"use strict";
var app_configuration_1 = require('./../../configuration/app.configuration');
var navigation_component_1 = require('./navigation.component');
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/core/testing');
describe('NavigationComponent', function () {
    var fixture;
    var comp;
    // async beforeEach
    beforeEach(testing_2.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [navigation_component_1.NavigationComponent],
            providers: [
                app_configuration_1.Configuration
            ]
        }).compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(navigation_component_1.NavigationComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges(); // trigger initial data binding
    });
    afterEach(function () {
        fixture.destroy();
    });
    it('component should be instanciated', function () {
        expect(comp).toBeDefined();
    });
    it('configuration should be defined', testing_1.inject([app_configuration_1.Configuration], function (service) {
        expect(comp._configuration).toBeDefined();
    }));
});
//# sourceMappingURL=navigation.component.spec.js.map