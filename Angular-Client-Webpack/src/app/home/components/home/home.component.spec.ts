import { FoodServiceMock } from './../../../../testing/foodServiceMock';
import { FoodDataService } from './../../../shared/services/food-data.service';
import { HomeComponent } from './home.component';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { async } from '@angular/core/testing';
import { AbstractNotificationService, MessageType } from '../../../shared/services/notification.service';

describe('HomeComponent', () => {

    let fixture: ComponentFixture<HomeComponent>;
    let comp: HomeComponent;

    let abstractNotificationServiceStub: any;

    // async beforeEach
    beforeEach(async(() => {

        class AbstractNotificationServiceStub {

            showNotification(type: MessageType, title: string, message: string, icon?: string): void {
                console.log('showNotification');
            }

        };

        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            providers: [
                { provide: FoodDataService, useClass: FoodServiceMock },
                { provide: AbstractNotificationService, useClass: AbstractNotificationServiceStub }
            ]
        }); // .compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        comp = fixture.componentInstance;
        // fixture.detectChanges(); // trigger initial data binding not needed with webpack
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('component should be instanciated',
        inject([FoodDataService, AbstractNotificationService],
            (service: FoodDataService, notif: AbstractNotificationService) => {
                expect(comp).toBeDefined();
            }));

    it('updatefood should be defined', inject([FoodDataService], (service: FoodDataService) => {
        expect(comp.updateFood).toBeDefined();
    }));

    it('updatefood should call service --> getFood', inject([FoodDataService], (service: FoodDataService) => {
        service.GetAllFood = jasmine.createSpy('GetAllFood').and.returnValue(service.GetAllFood());
        comp.updateFood();
        expect(service.GetAllFood).toHaveBeenCalledTimes(1);
    }));

    it('selectedFood should be one foodItem', inject([FoodDataService], (service: FoodDataService) => {
        service.GetAllFood = jasmine.createSpy('GetAllFood').and.returnValue(service.GetAllFood());
        comp.updateFood();
        expect(comp.selectedFood).toBeDefined();
    }));

    it('lastupdatedTime should be set', inject([FoodDataService], (service: FoodDataService) => {
        service.GetAllFood = jasmine.createSpy('GetAllFood').and.returnValue(service.GetAllFood());
        comp.updateFood();
        expect(comp.selectedFood).toBeDefined();
    }));
});
