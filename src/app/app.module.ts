import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { HttpClientModule } from '@angular/common/http';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [FormsModule,IonicStorageModule.forRoot(),BrowserModule, IonicModule.forRoot(), AppRoutingModule,ScheduleModule,HttpClientModule ],
  providers: [
    AndroidPermissions,
    StatusBar,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
