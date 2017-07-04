import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AbstractNotificationService, MessageType } from '../../../core/services/notification.service';
import { PlatformInformationProvider } from '../../../core/services/platformInformation.provider';
import { FoodDataService } from './../../../core/data-services/food-data.service';
import { FoodItem } from './../../../shared/models/foodItem.model';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    randomFood: FoodItem[] = [];
    allFood: Observable<FoodItem[]>;
    isWorking = false;

    constructor(private foodDataService: FoodDataService,
        private notificationService: AbstractNotificationService,
        public platformInformationProvider: PlatformInformationProvider) {
    }

    ngOnInit() {
        this.getFood();
        this.getRandomMeal();
    }

    updateFood() {
        this.getRandomMeal();
    }

    private getFood() {
        this.allFood = this.foodDataService.getAllFood();
    }

    private getRandomMeal() {
        this.isWorking = true;
        this.foodDataService
            .getRandomMeal()
            .subscribe((response: FoodItem[]) => {

                if (!response) {
                    this.notificationService.showNotification(MessageType.Info, 'Oh Snap...', 'No food found...');
                    return;
                }

                this.randomFood = response;
                this.notificationService.showNotification(MessageType.Success, 'Oh hey...', 'Food Loaded');
            },
            (error: any) => {
                console.log(error)
                this.notificationService.showNotification(MessageType.Error, 'Uh oh...', 'There was an Error');
            },
            () => this.isWorking = false);
    }

}
