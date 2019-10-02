import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// shared modules
import { SharedModule } from './shared/shared.module';

// guards
import { AuthGuard } from '../auth/shared/guards/auth.guard';

export const ROUTES: Routes = [
  {
    path: 'meals',
    loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./schedule/schedule.module').then(m => m.ScheduleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'workouts',
    loadChildren: () =>
      import('./workouts/workouts.module').then(m => m.WorkoutsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), SharedModule.forRoot()]
})
export class HealthModule {}
