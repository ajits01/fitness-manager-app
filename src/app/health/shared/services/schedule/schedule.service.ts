import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from 'store';
import { tap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Meal_FSDoc } from '../meals/meals.service';
import { Workout_FSDoc } from '../workouts/workouts.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth/shared/services/auth/auth.service';

export interface ScheduleItem {
  meals: Meal_FSDoc[];
  workouts: Workout_FSDoc[];
  section: string;
  timestamp: number;
  id?: string;
}

export interface ScheduleList {
  morning?: ScheduleItem;
  lunch?: ScheduleItem;
  evening?: ScheduleItem;
  snacks?: ScheduleItem;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$.asObservable().pipe(
    withLatestFrom(this.section$),
    map(([items, section]: any[]) => {
      const id = section.data.id;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }
    })
  );

  selected$ = this.section$
    .asObservable()
    .pipe(tap((next: any) => this.store.set('selected', next)));
  list$ = this.section$.asObservable().pipe(
    map((value: any) => this.store.value[value.type]),
    tap((next: any) => this.store.set('list', next))
  );

  schedule$: Observable<
    ScheduleItem[] | ScheduleList
  > = this.date$.asObservable().pipe(
    tap((next: any) => this.store.set('date', next)),
    map(day => {
      const startAt = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      ).getTime();
      const endAt =
        new Date(
          day.getFullYear(),
          day.getMonth(),
          day.getDate() + 1
        ).getTime() - 1;
      return { startAt, endAt };
    }),
    switchMap(({ startAt, endAt }) => {
      return this.getSchedule(startAt, endAt);
    }),
    map(data => {
      const mapped: ScheduleList = {};
      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }
      return mapped;
    }),
    tap(next => {
      // console.log('next', next);
      this.store.set('schedule', next);
    })
  );

  constructor(
    private store: Store,
    private db: AngularFirestore,
    private authService: AuthService
  ) {}

  get uid() {
    return this.authService.user.uid;
  }

  updateItem(items: string[]) {
    this.itemList$.next(items);
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return this.db
      .collection(`user/${this.uid}/schedule`)
      .doc(key)
      .update(payload);
  }

  private createSection(payload: ScheduleItem) {
    return this.db.collection(`user/${this.uid}/schedule`).add(payload);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db
      .collection<ScheduleItem>(`user/${this.uid}/schedule`, ref =>
        ref
          .orderBy('timestamp')
          .startAt(startAt)
          .endAt(endAt)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ScheduleItem;
            const id = a.payload.doc.id;
            return { ...data, id };
          })
        )
      );
  }
}
