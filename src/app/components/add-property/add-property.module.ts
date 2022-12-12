import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AddPropertyComponent } from './add-property.component';

@NgModule({
  declarations: [ AddPropertyComponent ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [ AddPropertyComponent ]
})
export class AddPropertyModule { }
