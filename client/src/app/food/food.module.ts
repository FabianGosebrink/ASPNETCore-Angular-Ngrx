import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { allContainerComponents } from './container';
import { FoodRoutes } from './food.routes';
import { FilterPipe } from './pipes/filter.pipe';
import { allPresComponents } from './presentational';
import { effects } from './store/effects';
import { reducers } from './store/reducers';
import { IsInRangeValidator } from './validators/isInRange.validator';
import { IsNumberValidator } from './validators/isNumber.validator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(FoodRoutes),
    StoreModule.forFeature('food', reducers),
    EffectsModule.forFeature(effects),
    ReactiveFormsModule,
  ],

  declarations: [
    ...allContainerComponents,
    ...allPresComponents,

    IsInRangeValidator,
    IsNumberValidator,
    FilterPipe,
  ],

  exports: [],
})
export class FoodModule {}
