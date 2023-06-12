import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorMsgComponent } from './components/utilities/error-msg/error-msg.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { HomeComponent } from './pages/home/home.component';
import { BtnComponent } from './components/utilities/btn/btn.component';
import { TaskCardComponent } from './components/task-card/task-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorMsgComponent,
    InputFormComponent,
    HomeComponent,
    BtnComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
