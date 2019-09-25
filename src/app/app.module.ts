import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Store } from 'store';
import { AppRoutingModule } from './app-routing.module';

// Feature modules
import { AuthModule } from './auth/auth.module';

// Containers
import { AppComponent } from './containers/app/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, AppRoutingModule],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}
