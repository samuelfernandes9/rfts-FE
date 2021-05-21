import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterContactDetailsPageRoutingModule } from './enter-contact-details-routing.module';

import { EnterContactDetailsPage } from './enter-contact-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterContactDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EnterContactDetailsPage]
})
export class EnterContactDetailsPageModule {}
