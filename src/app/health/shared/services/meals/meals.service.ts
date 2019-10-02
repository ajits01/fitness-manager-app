import { Injectable } from '@angular/core';
import { Store } from 'store';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Meal_FSDoc {
  mealId: string;
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
          const mealId = a.payload.doc.id;
          const exists = a.payload.doc.exists;
          return { mealId, exists, ...data };
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

  addMeal(meal: Meal) {
    return this.db.collection(`user/${this.uid}/meals`).add({
      ...meal,
      timestamp: new Date().getTime()
    });
  }

  removeMeal(key: string) {
    return this.db
      .collection(`user/${this.uid}/meals`)
      .doc(key)
      .delete();
  }
}
