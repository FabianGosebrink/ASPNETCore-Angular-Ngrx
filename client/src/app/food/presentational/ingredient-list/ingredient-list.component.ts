import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredient } from '../../../shared/models/ingredient.model';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css'],
})
export class IngredientListComponent implements OnInit {
  @Input()
  ingredients: Ingredient[];

  @Output()
  ingredientDeleted = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  delete(ingredient: Ingredient) {
    this.ingredientDeleted.emit(ingredient);
  }
}
