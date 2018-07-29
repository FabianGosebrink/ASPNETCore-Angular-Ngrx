import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../../../shared/models/ingredient.model';
import * as fromStore from '../../store';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;
  form: FormGroup;

  constructor(
    private store: Store<fromStore.FoodState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl('', Validators.required)
    });

    this.ingredients$ = this.store.pipe(select(fromStore.getAllIngredients));

    this.route.params.pipe(map(p => p.foodId)).subscribe((foodId: string) => {
      this.store.dispatch(new fromStore.LoadIngredientsAction(foodId));
    });
  }

  addIngredient() {
    if (!this.form.valid) {
      return;
    }
    const foodId = this.route.snapshot.params['foodId'];
    this.store.dispatch(
      new fromStore.AddIngredientAction(this.form.value, foodId)
    );
    this.form.reset();
  }

  delete(ingredient: Ingredient) {
    const foodId = this.route.snapshot.params['foodId'];
    this.store.dispatch(
      new fromStore.DeleteIngredientAction(ingredient, foodId)
    );
  }
}
