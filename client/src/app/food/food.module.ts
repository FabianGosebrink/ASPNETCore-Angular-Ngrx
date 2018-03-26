import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared/shared.module';
import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { FoodFormComponent } from './components/foodForm/foodForm.component';
import { FoodListComponent } from './components/foodList/foodList.component';
import { MainFoodComponent } from './components/mainFood/mainFood.component';
import { FoodRoutes } from './food.routes';
import { FilterPipe } from './pipes/filter.pipe';
import { effects, reducers } from './store';
import { IsInRangeValidator } from './validators/isInRange.validator';
import { IsNumberValidator } from './validators/isNumber.validator';
import { FoodPictureComponent } from './components/food-picture/food-picture.component';
import * as fromFoodGuards from './guards';
import { IngredientsComponent } from './components/ingredients/ingredients.component';

@NgModule({
  imports: [
    // Modules
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(FoodRoutes),
    StoreModule.forFeature('food', reducers),
    EffectsModule.forFeature(effects),
    ReactiveFormsModule
  ],

  declarations: [
    // Components & Directives
    FoodListComponent,
    FoodDetailsComponent,
    FoodFormComponent,
    MainFoodComponent,

    IsInRangeValidator,
    IsNumberValidator,
    FilterPipe,
    FoodPictureComponent,
    IngredientsComponent
  ],

  providers: [...fromFoodGuards.foodGuards],

  exports: []
})
export class FoodModule {}
