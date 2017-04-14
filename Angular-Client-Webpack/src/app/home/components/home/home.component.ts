import { FoodDataService } from './../../../shared/services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem.model';
import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { AbstractNotificationService, MessageType } from '../../../shared/services/notification.service';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    selectedFood: FoodItem;
    lastUpdatedDate: Date;
    isWorking = false;

    constructor(private foodDataService: FoodDataService, private notificationService: AbstractNotificationService) {

    }

    ngOnInit() {
        this.getFood();
    }

    updateFood = (): void => {
        this.getFood();
    }

    private getFood = (): void => {
        this.isWorking = true;
        this.foodDataService
            .GetRandomFood()
            .subscribe((response: FoodItem) => {

                if (!response) {
                    this.notificationService.showNotification(MessageType.Info, 'Oh Snap...', 'No food found...');
                    return;
                }

                this.selectedFood = response;
                this.lastUpdatedDate = new Date();
                this.notificationService.showNotification(MessageType.Success, 'Oh hey...', 'Food Loaded');
            },
            (error: any) => {
                console.log(error)
                this.notificationService.showNotification(MessageType.Error, 'Uh oh...', 'There was an Error');
            },
            () => this.isWorking = false);
    }

}
