import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Store } from 'store';
import { AppRoutingModule } from './app-routing.module';

// Feature modules
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';

// Containers
import { AppComponent } from './containers/app/app.component';
import { FmaHeaderComponent } from './components/fma-header/fma-header.component';
import { FmaNavComponent } from './components/fma-nav/fma-nav.component';

@NgModule({
  declarations: [AppComponent, FmaHeaderComponent, FmaNavComponent],
  imports: [BrowserModule, AuthModule, HealthModule, AppRoutingModule],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {}
