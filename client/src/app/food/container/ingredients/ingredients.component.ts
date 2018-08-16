import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { FoodStoreFacade } from '../../store/food-store.facade';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css'],
})
export class IngredientsComponent implements OnInit {
  ingredients$: Observable<Ingredient[]>;
  form: FormGroup;

  constructor(private facade: FoodStoreFacade, private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      description: new FormControl('', Validators.required),
    });

    this.ingredients$ = this.facade.ingredients$;

    this.route.params.pipe(map(p => p.foodId)).subscribe((foodId: string) => {
      this.facade.loadAllIngredients(foodId);
    });
  }

  addIngredient() {
    if (!this.form.valid) {
      return;
    }
    const foodId = this.route.snapshot.params['foodId'];

    this.facade.addIngredient(this.form.value, foodId);

    this.form.reset();
  }

  delete(ingredient: Ingredient) {
    const foodId = this.route.snapshot.params['foodId'];
    this.facade.deleteIngredient(ingredient, foodId);
  }
}
