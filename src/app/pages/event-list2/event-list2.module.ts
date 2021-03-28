import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventList2PageRoutingModule } from './event-list2-routing.module';

import { EventList2Page } from './event-list2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventList2PageRoutingModule
  ],
  declarations: [EventList2Page]
})
export class EventList2PageModule {}
