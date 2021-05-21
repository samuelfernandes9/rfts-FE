import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublishMessagePage } from './publish-message.page';

const routes: Routes = [
  {
    path: '',
    component: PublishMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishMessagePageRoutingModule {}
