import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { map, tap, filter } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

export interface Meal_FSDoc {
  id: string;
  name: string;
  ingredients: string[];
  exists: boolean;
  timestamp: number;
}

export interface Meal {
  name: string;
  ingredients: string[];
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  meals$: Observable<Meal_FSDoc[]> = this.db
    .collection<Meal_FSDoc>(`user/${this.uid}/meals`)
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Meal;
          const id = a.payload.doc.id;
          const exists = a.payload.doc.exists;
          return { id, exists, ...data };
        })
      ),
      tap(data => this.store.set(`meals`, data))
    );

  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  getMeal(key: string) {
    if (!key) {
      return of({});
    }
    return this.store.select<Meal_FSDoc[]>('meals').pipe(
      filter(Boolean),
      map((meals: Meal_FSDoc[]) =>
        meals.find((meal: Meal_FSDoc) => meal.id === key)
      )
    );
  }

  addMeal(meal: Meal) {
    return this.db.collection(`user/${this.uid}/meals`).add({
      ...meal,
      timestamp: new Date().getTime()
    });
  }

  updateMeal(key: string, meal: Meal) {
    return this.db
      .collection(`user/${this.uid}/meals`)
      .doc(key)
      .update(meal);
  }

  removeMeal(key: string) {
    return this.db
      .collection(`user/${this.uid}/meals`)
      .doc(key)
      .delete();
  }
}
