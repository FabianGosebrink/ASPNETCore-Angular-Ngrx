import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import * as components from './components';
import { FoodRoutes } from './food.routes';
import * as fromFoodGuards from './guards';
import { FilterPipe } from './pipes/filter.pipe';
import { effects, reducers } from './store';
import { IsInRangeValidator } from './validators/isInRange.validator';
import { IsNumberValidator } from './validators/isNumber.validator';

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
    ...components.allComponents,

    IsInRangeValidator,
    IsNumberValidator,
    FilterPipe
  ],

  providers: [...fromFoodGuards.foodGuards],

  exports: []
})
export class FoodModule {}
