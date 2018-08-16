import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
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
import * as fromRootStore from '../../store';
import { EMealFooterComponent } from '../footer/eMeal-footer.component';
import { RandomMealComponent } from '../randomMeal/randomMeal.component';
import { SingleMealComponent } from '../single-meal/single-meal.component';
import * as fromHomeActions from '../store/actions';
import { HomeStoreFacade } from '../store/home-store.facade';
import * as fromHomeStore from '../store/reducers';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let comp: HomeComponent;

  // async beforeEachs
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRootStore.reducers,
          home: combineReducers(fromHomeStore.reducers),
        }),
      ],
      declarations: [
        HomeComponent,
        RandomMealComponent,
        SingleMealComponent,
        EMealFooterComponent,
      ],
      providers: [
        { provide: HomeStoreFacade, useClass: HomeStoreFacade },
        { provide: FoodDataService, useClass: FoodServiceMock },
        {
          provide: AbstractNotificationService,
          useClass: AbstractNotificationServiceStub,
        },
        { provide: CpuValueService, useClass: CpuValueServiceMock },
        {
          provide: AbstractCameraService,
          useClass: AbstractCameraServiceStub,
        },
        PlatformInformationProvider,
      ],
    }).compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('component should be instanciated', () => {
    expect(comp).toBeDefined();
  });

  it('updatefood should be defined', () => {
    expect(comp.updateFood).toBeDefined();
  });

  it('updatefood should dispatch the correct action', () => {
    const store = TestBed.get(Store);
    const action = new fromHomeActions.LoadRandomMealAction();
    spyOn(store, 'dispatch').and.callThrough();

    comp.updateFood();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('after init was called `loadRandomMeal` was called one times', () => {
    const facade = TestBed.get(HomeStoreFacade);
    spyOn(facade, 'loadRandomMeal');
    fixture.detectChanges();

    expect(facade.loadRandomMeal).toHaveBeenCalledTimes(1);
  });

  it('after init was called "randomMeal$" is set', () => {
    fixture.detectChanges(); // call init here

    const foodItem1 = new FoodItem();
    foodItem1.id = 'foodItem1';

    const foodItem2 = new FoodItem();
    foodItem2.id = 'foodItem2';

    const items = [foodItem1, foodItem2];

    const action = new fromHomeActions.LoadRandomMealSuccessAction(items);
    const store = TestBed.get(Store);

    store.dispatch(action);

    comp.randomMeal$.subscribe(data => {
      expect(data.length).toBe(items.length);
    });
  });

  it('h2 should give correct headline', () => {
    const de = fixture.debugElement.query(By.css('h2'));
    const el = de.nativeElement;
    expect(el.textContent).toEqual('Your meal for today');
  });
});
