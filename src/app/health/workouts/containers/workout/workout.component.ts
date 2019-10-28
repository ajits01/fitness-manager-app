import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Workout,
  Workout_FSDoc,
  WorkoutsService
} from 'src/app/health/shared/services/workouts/workouts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'fma-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {
  workout$: Observable<Workout_FSDoc | {}>;
  subscription: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params.pipe(
      switchMap(param => {
        return this.workoutsService.getWorkout(param.id);
      })
    );
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: string) {
    const key = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
