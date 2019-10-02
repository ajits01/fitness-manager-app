import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'fma-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  addMeal(event: Meal) {
    console.log('addMeal event: ', event);
  }
}
