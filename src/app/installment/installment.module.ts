import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallmentComponent } from './installment.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng5SliderModule,
    ChartsModule
  ],
  declarations: [InstallmentComponent],
  exports: [InstallmentComponent]
})
export class InstallmentModule { }
