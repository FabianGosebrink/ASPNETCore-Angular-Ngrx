import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';
import { environment } from '../../../environments/environment';
import * as fromFoodStore from '../../food/store';
import { Ingredient } from '../../shared/models/ingredient.model';

@Injectable()
export class SignalRService {
  private foodHubConnection: HubConnection;

  constructor(private store: Store<any>) {}

  initializeConnection(): Observable<boolean> {
    this.foodHubConnection = new HubConnection(environment.server + 'foodhub');

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
      this.store.dispatch(new fromFoodStore.ReceivedFoodAddedAction(data));
    });

    this.foodHubConnection.on('food-deleted', (data: any) => {
      this.store.dispatch(new fromFoodStore.ReceivedFoodDeletedAction(data));
    });

    this.foodHubConnection.on('food-updated', (data: any) => {
      this.store.dispatch(new fromFoodStore.ReceivedFoodUpdatedAction(data));
    });

    this.foodHubConnection.on(
      'ingredient-added',
      (foodId: string, ingredient: Ingredient) => {
        this.store.dispatch(
          new fromFoodStore.ReceivedIngredientAddedAction(ingredient)
        );
      }
    );

    this.foodHubConnection.on(
      'ingredient-deleted',
      (foodId: string, ingredientId: string) => {
        this.store.dispatch(
          new fromFoodStore.ReceivedIngredientDeletedAction(ingredientId)
        );
      }
    );
  }
}
