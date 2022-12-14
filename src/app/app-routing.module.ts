import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPropertyComponent } from './components/add-property/add-property.component';
import { LogInComponent } from './components/login/login.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { PropertyComponent } from './components/property/property.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', component: PropertyComponent },
  { path: 'add-property/:id', component: AddPropertyComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'login', component: LogInComponent },
  { path: 'properties', component: PropertyComponent },
  { path: 'property-detail/:id', component: PropertyDetailComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'user-administration', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
