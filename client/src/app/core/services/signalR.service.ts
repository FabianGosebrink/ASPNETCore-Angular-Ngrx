import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FoodStoreFacade } from '../../food/store/food-store.facade';
import { Ingredient } from '../../shared/models/ingredient.model';

@Injectable()
export class SignalRService {
  private foodHubConnection: HubConnection;

  constructor(private facade: FoodStoreFacade) {}

  initializeConnection(): Observable<boolean> {
    this.foodHubConnection = new HubConnectionBuilder()
      .withUrl(environment.server + 'foodhub')
      .build();

    this.registerOnServerEvents();

    return Observable.create((observer: Observer<boolean>) => {
      this.foodHubConnection
        .start()
        .then(() => {
          console.log('Hub connection started');
          observer.next(true);
          observer.complete();
        })
        .catch(err => {
          console.log('Error while establishing connection', err);
          observer.error(err);
        });
    });
  }

  private registerOnServerEvents(): void {
    this.foodHubConnection.on('food-added', (data: any) => {
      this.facade.receivedFoodData(data);
    });

    this.foodHubConnection.on('food-deleted', (data: any) => {
      this.facade.receivedFoodDeleted(data);
    });

    this.foodHubConnection.on('food-updated', (data: any) => {
      this.facade.receivedFoodUpdated(data);
    });

    this.foodHubConnection.on(
      'ingredient-added',
      (foodId: string, ingredient: Ingredient) => {
        this.facade.receivedIngredientAdded(ingredient);
      }
    );

    this.foodHubConnection.on(
      'ingredient-deleted',
      (foodId: string, ingredientId: string) => {
        this.facade.receivedIngredientDeleted(ingredientId);
      }
    );
  }
}
