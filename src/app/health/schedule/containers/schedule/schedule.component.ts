import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  ScheduleService,
  ScheduleItem
} from 'src/app/health/shared/services/schedule/schedule.service';
import { Store } from 'store';
import {
  Workout,
  WorkoutsService
} from 'src/app/health/shared/services/workouts/workouts.service';
import {
  Meal,
  MealsService
} from 'src/app/health/shared/services/meals/meals.service';

@Component({
  selector: 'fma-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;

  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;

  subscriptions: Subscription[] = [];
  constructor(
    private scheduleService: ScheduleService,
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService
  ) {}

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.scheduleService.items$.subscribe()
    ];
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItem(items);
    this.closeAssign();
  }

  closeAssign() {
    this.open = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
