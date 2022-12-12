import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material';
import { PropertyDetailComponent } from './property-detail.component';

@NgModule({
  declarations: [ PropertyDetailComponent ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ PropertyDetailComponent ]
})
export class PropertyDetailModule { }
