import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPropertyComponent } from './components/add-property/add-property.component';

import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { PropertyComponent } from './components/property/property.component';

const routes: Routes = [
  { path: '', component: PropertyComponent },
  { path: 'add-property', component: AddPropertyComponent },
  { path: 'properties', component: PropertyComponent },
  { path: 'property-detail/:id', component: PropertyDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
