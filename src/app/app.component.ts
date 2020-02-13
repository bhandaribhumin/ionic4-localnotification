import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router, NavigationExtras } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _localNotifications: LocalNotifications,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._localNotifications.requestPermission();
      this._localNotifications.on('click').subscribe((notification) => {
        console.log('notification', JSON.stringify(notification));
        const navigationExtras: NavigationExtras = {
          queryParams: {
            data: "sample data",
            notificationData: JSON.stringify(notification)
          }
        };
        this.router.navigate(['/detail'], navigationExtras).then(() => {
          console.log('after redirec');
        });

      });
      this._localNotifications.on('trigger').subscribe((triggernotification) => {
        console.log('trigger notification', JSON.stringify(triggernotification));
      });
    });
  }
}
