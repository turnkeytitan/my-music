import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { LoginComponent } from './components/organisms/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './components/organisms/search/search.component';
import { AccountComponent } from './components/organisms/account/account.component';
import { TrackComponent } from './components/organisms/track/track.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    AuthComponent,
    LoginPageComponent,
    HomeComponent,
    SearchComponent,
    AccountComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
