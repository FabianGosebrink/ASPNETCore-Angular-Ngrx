import { FoodDataService } from './../../../shared/services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { AbstractNotificationService, MessageType } from '../../../shared/services/notification.service';

@Component({
    selector: 'mainFood-component',
    templateUrl: './mainFood.component.html'
})

export class MainFoodComponent implements OnInit {
    foodSelectedFromList: FoodItem;
    foods: Observable<FoodItem[]>;

    constructor(private _foodDataService: FoodDataService, private notificationService: AbstractNotificationService) {
        this.resetCurrentlySelectedFoodItem();
    }

    ngOnInit() {
        this.getFood();
    }

    setCurrentlySelectedFood(foodItem: FoodItem) {
        this.foodSelectedFromList = foodItem;
    }

    addFood = (foodItem: FoodItem): void => {
        this._foodDataService
            .AddFood(foodItem)
            .subscribe((response: FoodItem) => {
                this.notificationService.showNotification(MessageType.Success, 'Food', 'Food Added!');
                this.resetCurrentlySelectedFoodItem();
                this.getFood();
            },
            (error: any) => {
                console.log(error)
                this.notificationService.showNotification(MessageType.Error, 'Food', 'There was an error :(');
            });
    }

    updateFood = (foodItem: FoodItem): void => {
        this._foodDataService
            .UpdateFood(foodItem.id, foodItem)
            .subscribe((response: FoodItem) => {
                this.notificationService.showNotification(MessageType.Success, 'Food', 'Food updated!');
                this.resetCurrentlySelectedFoodItem();
                this.getFood();
            },
            (error: any) => {
                console.log(error)
                this.notificationService.showNotification(MessageType.Error, 'Food', 'There was an error :(');
            });
    }

    deleteFood(foodItem: FoodItem) {
        this._foodDataService
            .DeleteFood(foodItem.id)
            .subscribe(() => {
                this.notificationService.showNotification(MessageType.Success, 'Food', 'Food deleted!');
                this.getFood();
            },
            (error: any) => {
                console.log(error)
                this.notificationService.showNotification(MessageType.Error, 'Food', 'There was an error :(');
            });
    }

    private getFood = (): void => {
        this.foods = this._foodDataService.GetAllFood();
    }

    private resetCurrentlySelectedFoodItem() {
        this.setCurrentlySelectedFood(new FoodItem());
    }
}
