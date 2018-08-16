import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as fromReducers from '../../../store/reducers';
import { IngredientListComponent } from '../../presentational/ingredient-list/ingredient-list.component';
import * as fromFeatureReducers from '../../store/reducers';
import { IngredientsComponent } from './ingredients.component';

describe('IngredientsComponent', () => {
  let component: IngredientsComponent;
  let fixture: ComponentFixture<IngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({
          ...fromReducers.reducers,
          food: combineReducers(fromFeatureReducers.reducers),
        }),
      ],
      declarations: [IngredientsComponent, IngredientListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
