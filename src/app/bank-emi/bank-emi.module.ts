import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BankEmiPageRoutingModule } from './bank-emi-routing.module';

import { BankEmiPage } from './bank-emi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BankEmiPageRoutingModule
  ],
  declarations: [BankEmiPage]
})
export class BankEmiPageModule {}
