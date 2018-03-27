import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import { Configuration } from 'app/shared/configuration/app.configuration';
import { Store } from '@ngrx/store';
import * as fromFoodStore from 'app/food/store';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
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
