import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { FoodEffects } from './store/effects/food.effects';
import { foodItemsReducer } from './store/reducer/food.reducer';
import { IsInRangeValidator } from './validators/isInRange.validator';
import { IsNumberValidator } from './validators/isNumber.validator';

@NgModule({
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(FoodRoutes),
        StoreModule.forFeature('food', {
            foodItems: foodItemsReducer
        }),
        EffectsModule.forFeature([FoodEffects])
    ],

    declarations: [
        // Components & Directives
        FoodListComponent,
        FoodDetailsComponent,
        FoodFormComponent,
        MainFoodComponent,

        IsInRangeValidator,
        IsNumberValidator,
        FilterPipe
    ],

    providers: [

    ],

    exports: [

    ]
})

export class FoodModule { }
