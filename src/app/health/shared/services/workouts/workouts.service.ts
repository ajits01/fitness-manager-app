import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { map, tap, filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

export interface Workout_FSDoc {
  id: string;
  name: string;
  type: string;
  strength: any;
  endurance: any;
  exists: boolean;
  timestamp: number;
}

export interface Workout {
  name: string;
  type: string;
  strength: any;
  endurance: any;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  workouts$: Observable<Workout_FSDoc[]> = this.db
    .collection<Workout_FSDoc>(`user/${this.uid}/workouts`)
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Workout;
          const id = a.payload.doc.id;
          const exists = a.payload.doc.exists;
          return { exists, ...data, id };
        })
      ),
      tap(data => this.store.set(`workouts`, data))
    );

  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getWorkout(key: string) {
    if (!key) {
      return of({});
    }
    return this.store.select<Workout_FSDoc[]>('workouts').pipe(
      filter(Boolean),
      map((workouts: Workout_FSDoc[]) =>
        workouts.find((workout: Workout_FSDoc) => workout.id === key)
      )
    );
  }

  addWorkout(workout: Workout) {
    return this.db.collection(`user/${this.uid}/workouts`).add({
      ...workout,
      timestamp: new Date().getTime()
    });
  }

  updateWorkout(key: string, workout: Workout) {
    return this.db
      .collection(`user/${this.uid}/workouts`)
      .doc(key)
      .update(workout);
  }

  removeWorkout(key: string) {
    return this.db
      .collection(`user/${this.uid}/workouts`)
      .doc(key)
      .delete();
  }
}
