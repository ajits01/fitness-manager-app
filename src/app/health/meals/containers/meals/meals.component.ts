import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MealsService,
  Meal_FSDoc,
  Meal
} from 'src/app/health/shared/services/meals/meals.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

@Component({
  selector: 'fma-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss']
})
export class MealsComponent implements OnInit, OnDestroy {
  meals$: Observable<Meal_FSDoc[]>;
  subscription: Subscription;

  constructor(private store: Store, private mealsService: MealsService) {}

  ngOnInit() {
    this.meals$ = this.store.select<Meal_FSDoc[]>(`meals`);
    this.subscription = this.mealsService.meals$.subscribe();
  }

  removeMeal(event: Meal_FSDoc) {
    this.mealsService.removeMeal(event.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
