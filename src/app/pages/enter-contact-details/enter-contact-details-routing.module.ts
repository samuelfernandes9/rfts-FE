import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterContactDetailsPage } from './enter-contact-details.page';

const routes: Routes = [
  {
    path: '',
    component: EnterContactDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterContactDetailsPageRoutingModule {}
