import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../../shared/models/foodItem.model';

@Component({
  selector: 'app-single-meal',
  templateUrl: './single-meal.component.html',
  styleUrls: ['./single-meal.component.css']
})
export class SingleMealComponent implements OnInit {
  @Input() fooditem: FoodItem;
  constructor() {}

  ngOnInit() {}
}
