import { CpuValueServiceMock } from '../../../../testing/CpuValueServiceMock';
import { FoodDataService } from '../../../core/data-services/food-data.service';
import { CpuValueService } from '../../../core/services/cpuValue.service';
import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { PlatformInformationProvider } from '../../../core/services/platformInformation.provider';
import { EMealFooterComponent } from '../footer/eMeal-footer.component';
import { RandomMealComponent } from '../randomMeal/randomMeal.component';
import { SneakPeekComponent } from '../sneakPeek/sneekPeek.component';
import { FoodServiceMock } from './../../../../testing/foodServiceMock';
import { HomeComponent } from './home.component';
import { NgZone } from '@angular/core';
import { ComponentFixture, inject, TestBed, async } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

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
            imports: [
                RouterModule
            ],
            declarations: [HomeComponent, SneakPeekComponent, RandomMealComponent, EMealFooterComponent],
            providers: [
                { provide: FoodDataService, useClass: FoodServiceMock },
                { provide: AbstractNotificationService, useClass: AbstractNotificationServiceStub },
                { provide: CpuValueService, useClass: CpuValueServiceMock },
                PlatformInformationProvider
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
        service.GetRandomMeal = jasmine.createSpy('GetRandomMeal').and.returnValue(service.GetRandomMeal());
        comp.updateFood();
        expect(service.GetRandomMeal).toHaveBeenCalledTimes(1);
    }));

    it('selectedFood should be one foodItem', inject([FoodDataService], (service: FoodDataService) => {
        service.GetAllFood = jasmine.createSpy('GetAllFood').and.returnValue(service.GetAllFood());
        comp.updateFood();
        expect(comp.randomFood).toBeDefined();
    }));
});
