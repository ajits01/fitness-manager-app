import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// third-party modules
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// shared modules
import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.module').then(m => m.RegisterModule)
      }
    ]
  }
];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: '',
  authDomain: 'fitness-manager-app-8d32f.firebaseapp.com',
  databaseURL: 'https://fitness-manager-app-8d32f.firebaseio.com',
  projectId: 'fitness-manager-app-8d32f',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  exports: [RouterModule]
})
export class AuthModule {}
