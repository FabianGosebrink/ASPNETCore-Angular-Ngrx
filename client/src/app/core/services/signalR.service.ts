import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { Configuration } from 'app/shared/configuration/app.configuration';
import { Store } from '@ngrx/store';
import * as fromFoodStore from 'app/food/store';
import { environment } from '../../../environments/environment';

@Injectable()
export class SignalRService {
  connectionEstablished = new EventEmitter<Boolean>();
  connectionExists = false;

  private _hubConnection: HubConnection;

  constructor(private store: Store<any>) {
    this._hubConnection = new HubConnection(environment.server + 'foodhub');

    this.registerOnServerEvents();

    this.startConnection();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection');
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('food-added', (data: any) => {
      this.store.dispatch(new fromFoodStore.ReceivedFoodAddedAction(data));
    });

    this._hubConnection.on('food-deleted', (data: any) => {
      this.store.dispatch(new fromFoodStore.ReceivedFoodDeletedAction(data));
    });

    this._hubConnection.on('food-updated', (data: any) => {
      this.store.dispatch(new fromFoodStore.ReceivedFoodUpdatedAction(data));
    });
  }
}
