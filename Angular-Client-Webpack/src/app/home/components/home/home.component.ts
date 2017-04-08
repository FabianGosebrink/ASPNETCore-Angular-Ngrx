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

    public selectedFood: FoodItem;
    public lastUpdatedDate: Date;
    public isWorking = false;

    constructor(private _foodDataService: FoodDataService, private notificationService: AbstractNotificationService) {

    }

    public ngOnInit() {
        this.getFood();
    }

    public updateFood = (): void => {
        this.getFood();
    }

    private getFood = (): void => {
        this.isWorking = true;
        this._foodDataService
            .GetAllFood()
            .subscribe((response: FoodItem[]) => {

                if (response.length <= 0) {
                    // showNotification(type: MessageType, title: string, message: string, icon?: string): void;
                    this.notificationService.showNotification(MessageType.Info, 'Oh Snap...', 'No food found...');
                    return;
                }

                let foodItems: FoodItem[] = response;
                let randomIndex = Math.floor(Math.random() * foodItems.length);
                this.selectedFood = foodItems[randomIndex];
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
