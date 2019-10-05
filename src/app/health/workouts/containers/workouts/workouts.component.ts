import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  WorkoutsService,
  Workout_FSDoc,
  Workout
} from 'src/app/health/shared/services/workouts/workouts.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from 'store';

@Component({
  selector: 'fma-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit, OnDestroy {
  workouts$: Observable<Workout_FSDoc[]>;
  subscription: Subscription;

  constructor(private store: Store, private workoutsService: WorkoutsService) {}

  ngOnInit() {
    this.workouts$ = this.store.select<Workout_FSDoc[]>(`workouts`);
    this.subscription = this.workoutsService.workouts$.subscribe();
  }

  removeWorkout(event: Workout_FSDoc) {
    this.workoutsService.removeWorkout(event.id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
