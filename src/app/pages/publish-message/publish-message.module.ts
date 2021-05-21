import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishMessagePageRoutingModule } from './publish-message-routing.module';

import { PublishMessagePage } from './publish-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishMessagePageRoutingModule
  ],
  declarations: [PublishMessagePage]
})
export class PublishMessagePageModule {}
