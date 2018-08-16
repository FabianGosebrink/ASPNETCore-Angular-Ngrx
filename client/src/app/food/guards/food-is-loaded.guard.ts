import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { FoodStoreFacade } from '../store/food-store.facade';

@Injectable({ providedIn: 'root' })
export class FoodIsLoadedGuard implements CanActivate {
  constructor(private facade: FoodStoreFacade) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.facade.foodItemsLoaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.facade.loadAllFoods();
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
