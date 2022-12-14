import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';

@NgModule({
  declarations: [ UserComponent ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [ UserComponent ]
})
export class UserModule { }
