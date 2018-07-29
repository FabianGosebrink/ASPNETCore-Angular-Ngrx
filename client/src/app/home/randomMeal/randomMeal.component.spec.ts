import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractCameraServiceStub } from '../../../testing/abstractCameraServiceMock';
import { AbstractNotificationServiceStub } from '../../../testing/abstractNotificationServiceMock';
import { CpuValueServiceMock } from '../../../testing/CpuValueServiceMock';
import { FoodServiceMock } from '../../../testing/foodServiceMock';
import { FoodDataService } from '../../core/data-services/food-data.service';
import { AbstractCameraService } from '../../core/services/camera.service';
import { CpuValueService } from '../../core/services/cpuValue.service';
import { AbstractNotificationService } from '../../core/services/notification.service';
import { PlatformInformationProvider } from '../../core/services/platformInformation.provider';
import { FoodItem } from '../../shared/models/foodItem.model';
import { EMealFooterComponent } from '../footer/eMeal-footer.component';
import { HomeComponent } from '../home/home.component';
import { SingleMealComponent } from '../single-meal/single-meal.component';
import { RandomMealComponent } from './randomMeal.component';

describe('RandomMeal Component', () => {
  let fixture: ComponentFixture<RandomMealComponent>;
  let comp: RandomMealComponent;

  class FoodItemFactory {
    static getFoodItem() {
      const fooditem = new FoodItem();
      fooditem.id = '1';
      fooditem.created = new Date();
      fooditem.calories = 999;
      fooditem.type = 'starter';
      fooditem.name = 'FoodItem1';

      return fooditem;
    }
  }

  // async beforeEachs
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        HomeComponent,
        RandomMealComponent,
        SingleMealComponent,
        EMealFooterComponent
      ],
      providers: [
        { provide: FoodDataService, useClass: FoodServiceMock },
        {
          provide: AbstractNotificationService,
          useClass: AbstractNotificationServiceStub
        },
        { provide: CpuValueService, useClass: CpuValueServiceMock },
        {
          provide: AbstractCameraService,
          useClass: AbstractCameraServiceStub
        },
        PlatformInformationProvider
      ]
    }).compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(RandomMealComponent);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be instanciated', () => {
    expect(comp).toBeDefined();
  });

  it('if loading is true we hide the app-single-meal-component', () => {
    comp.loading = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h4'));
    expect(de.nativeElement.innerHTML).toBe('Loading...');
  });
});
