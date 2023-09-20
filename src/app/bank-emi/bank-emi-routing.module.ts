import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankEmiPage } from './bank-emi.page';

const routes: Routes = [
  {
    path: '',
    component: BankEmiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankEmiPageRoutingModule {}
