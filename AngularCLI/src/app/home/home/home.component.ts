import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeState } from 'app/home/store/reducers/home.reducer';
import { Observable } from 'rxjs/Observable';

import * as HomeActions from '../store/actions/home.actions';

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    homeState$: Observable<HomeState>;

    constructor(private store: Store<any>) {
        this.homeState$ = this.store.select<HomeState>(state => state.home.homeFoodItems);
    }

    ngOnInit() {
        this.store.dispatch(new HomeActions.LoadFoodAction());
        this.store.dispatch(new HomeActions.LoadRandomMealAction());
    }

    updateFood() {
        this.store.dispatch(new HomeActions.LoadRandomMealAction());
    }
}
