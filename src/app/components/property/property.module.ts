import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';

import { PropertyComponent } from './property.component';



@NgModule({
  declarations: [ PropertyComponent ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [ PropertyComponent ]
})
export class PropertyModule { }
