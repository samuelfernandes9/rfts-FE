import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishMessagePageRoutingModule } from './publish-message-routing.module';

import { PublishMessagePage } from './publish-message.page';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RichTextEditorAllModule,
    PublishMessagePageRoutingModule
  ],
  declarations: [PublishMessagePage]
})
export class PublishMessagePageModule {}
