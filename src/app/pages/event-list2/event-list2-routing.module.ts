import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventList2Page } from './event-list2.page';

const routes: Routes = [
  {
    path: '',
    component: EventList2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventList2PageRoutingModule {}
