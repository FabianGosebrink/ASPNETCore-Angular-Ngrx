import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientsComponent } from './ingredients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromFeature from '../../store';
import * as fromRoot from '../../../store';
import { RouterTestingModule } from '@angular/router/testing';

describe('IngredientsComponent', () => {
  let component: IngredientsComponent;
  let fixture: ComponentFixture<IngredientsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          ReactiveFormsModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            food: combineReducers(fromFeature.reducers)
          })
        ],
        declarations: [IngredientsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
