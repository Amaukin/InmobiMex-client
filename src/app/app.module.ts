import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AddPropertyModule } from './components/add-property/add-property.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LogInModule } from './components/login/login.module';
import { RegisterModule } from './components/register/register.module';
import { PropertyDetailModule } from './components/property-detail/property-detail.module';
import { PropertyModule } from './components/property/property.module';
import { UserModule } from './components/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AddPropertyModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LogInModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule,
    PropertyDetailModule,
    PropertyModule,
    RegisterModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
