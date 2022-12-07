import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AddPropertyComponent } from './add-property.component';

@NgModule({
  declarations: [ AddPropertyComponent ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [ AddPropertyComponent ]
})
export class AddPropertyModule { }
