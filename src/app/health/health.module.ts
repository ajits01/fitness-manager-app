import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'meals',
    loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule)
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./workouts/workouts.module').then(m => m.WorkoutsModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)]
})
export class HealthModule {}
