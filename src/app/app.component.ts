import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic"
import { Storage } from '@ionic/storage';
import {readonly} from '../../config'


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'Add Additional Event Details',
      url: 'event-list',
      icon: 'edit'
    },
    {
      title: 'View Events',
      url: 'event-list2',
      icon: 'calendarmenu'
    },
    {
      title: 'Logs',
      url: 'logs',
      icon: 'logs'
    },
  ];
  readonly: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private androidPermissions: AndroidPermissions,
    private storage : Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.readonly = readonly;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(this.platform.is('cordova') && !this.readonly)
      {
        this.fcmSetup();
      }
      else
      {
        // console.log("Cannot initiate FCM as platform is not cordova")
      }
      
    });
  }
  
  fcmSetup()
  {
    FCM.getToken().then(token => {

     this.storage.set("fcmToken",token)
    });

    FCM.onNotification().subscribe(data => {
      if(data.wasTapped){
        console.log("Received in background : ",data);
        // this.eventId = data['eventId']
        // console.log("Event id from notif : ",this.eventId)
        // this.dataService.setData(4,this.eventId)
        // this.router.navigateByUrl('event-details/4')
      } else {
        console.log("Received in foreground : ",data);
        // this.eventId = data['eventId']
        // console.log("Event id from notif : ",this.eventId)
        // this.dataService.setData(5,this.eventId)
        // this.router.navigateByUrl('event-details/5')
      };
    });
  }
}
