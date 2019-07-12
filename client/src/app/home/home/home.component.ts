import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodItem } from '../../shared/models/foodItem.model';
import { HomeStoreFacade } from '../store/home-store.facade';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  randomMeal$: Observable<FoodItem[]>;
  loading$: Observable<boolean>;

  constructor(private facade: HomeStoreFacade) {}

  ngOnInit() {
    this.randomMeal$ = this.facade.randomMeal$;
    this.loading$ = this.facade.loading$;

    this.facade.loadRandomMeal();
  }

  updateFood() {
    this.facade.loadRandomMeal();
  }
}
