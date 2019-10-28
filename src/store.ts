import { Observable, BehaviorSubject } from 'rxjs';
import { pluck, distinctUntilChanged } from 'rxjs/operators';
import { User } from './app/auth/shared/services/auth/auth.service';
import { Meal_FSDoc } from './app/health/shared/services/meals/meals.service';
import { Workout_FSDoc } from './app/health/shared/services/workouts/workouts.service';

export interface State {
  user: User;
  meals: Meal_FSDoc[];
  workouts: Workout_FSDoc[];
  [key: string]: any;
}

const state: State = {
  user: undefined,
  meals: undefined,
  workouts: undefined
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }
}
