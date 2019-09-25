import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from 'store';
import {
  AuthService,
  User
} from 'src/app/auth/shared/services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'fma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fitness-manager-app';

  user$: Observable<User>;
  subscription: Subscription;

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.auth$.subscribe();
    this.user$ = this.store.select('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
