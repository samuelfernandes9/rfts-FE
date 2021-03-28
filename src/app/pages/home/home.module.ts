import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { ScheduleAllModule } from '@syncfusion/ej2-angular-schedule'
import { HomePage } from './home.page';
import { MomentModule } from 'angular2-moment';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ScheduleAllModule,
    IonicModule,
    MomentModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
