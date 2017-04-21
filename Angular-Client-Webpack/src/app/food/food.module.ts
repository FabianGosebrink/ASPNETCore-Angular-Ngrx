import { FilterPipe } from './pipes/filter.pipe';
import { IsNumberValidator } from './validators/isNumber.validator';
import { IsInRangeValidator } from './validators/isInRange.validator';
import { MainFoodComponent } from './components/mainFood/mainFood.component';
import { FoodFormComponent } from './components/foodForm/foodForm.component';
import { FoodDetailsComponent } from './components/foodDetails/foodDetails.component';
import { FoodListComponent } from './components/foodList/foodList.component';
import { FormsModule } from '@angular/forms';
import { FoodRoutes } from './food.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        // Modules
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(FoodRoutes)
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
