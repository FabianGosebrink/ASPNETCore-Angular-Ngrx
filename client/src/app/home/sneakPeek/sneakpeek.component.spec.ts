import { ComponentFixture } from '@angular/core/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AbstractCameraServiceStub } from '../../../testing/abstractCameraServiceMock';
import { AbstractNotificationServiceStub } from '../../../testing/abstractNotificationServiceMock';
import { CpuValueServiceMock } from '../../../testing/CpuValueServiceMock';
import { FoodDataService } from '../../core/data-services/food-data.service';
import { AbstractCameraService } from '../../core/services/camera.service';
import { CpuValueService } from '../../core/services/cpuValue.service';
import { AbstractNotificationService } from '../../core/services/notification.service';
import { PlatformInformationProvider } from '../../core/services/platformInformation.provider';
import { FoodItem } from '../../shared/models/foodItem.model';
import { EMealFooterComponent } from '../footer/eMeal-footer.component';
import { HomeComponent } from '../home/home.component';
import { RandomMealComponent } from '../randomMeal/randomMeal.component';
import { FoodServiceMock } from './../../../testing/foodServiceMock';
import { SneakPeekComponent } from './sneekPeek.component';


describe('SneakPeek Component', () => {

  class FoodItemFactory {
    static getFoodItem() {

      const fooditem = new FoodItem();
      fooditem.id = '1';
      fooditem.created = new Date();
      fooditem.calories = 999;
      fooditem.type = 'starter';
      fooditem.name = 'FoodItem1';

      return fooditem;
    };
  }

  let fixture: ComponentFixture<SneakPeekComponent>;
  let comp: SneakPeekComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [HomeComponent, SneakPeekComponent, RandomMealComponent, EMealFooterComponent],
      providers: [
        { provide: FoodDataService, useClass: FoodServiceMock },
        { provide: AbstractNotificationService, useClass: AbstractNotificationServiceStub },
        { provide: CpuValueService, useClass: CpuValueServiceMock },
        { provide: AbstractCameraService, useClass: AbstractCameraServiceStub },
        PlatformInformationProvider
      ]
    }).compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(SneakPeekComponent);
    comp = fixture.componentInstance;
    comp.foodItem = FoodItemFactory.getFoodItem();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be instanciated', () => {
    expect(comp).toBeDefined();
  });

  it('show placeholder if no imagestring is given', () => {
    const de = fixture.nativeElement.querySelector('img');
    expect(de.src).toBe('https://placehold.it/320x200');
  });

  it('only one picture is shown at a time', () => {
    const imagesBefore = fixture.nativeElement.querySelectorAll('img');
    expect(imagesBefore.length).toBe(1);

    comp.foodItem.imageString = 'http://somestring/';

    fixture.detectChanges();
    const imagesAfter = fixture.nativeElement.querySelectorAll('img');
    expect(imagesAfter.length).toBe(1);
    expect(imagesAfter[0].src).toBe('http://somestring/');
  });


  it('click on picture calls takePicture method', () => {
    spyOn(comp, 'takePicture');

    const de = fixture.nativeElement.querySelector('img');
    de.click();

    fixture.whenStable().then(() => {
      expect(comp.takePicture).toHaveBeenCalled();
    })
  });
});


