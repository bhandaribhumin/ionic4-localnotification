import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  date = moment().toISOString();
  message: string;
  scedules: any;
  constructor(private localNotifications: LocalNotifications, public toastController: ToastController) { }
  single_notification() {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: 'file://sound.mp3',
      data: { secret: 'my details' }
    });
  }
  date_picker_notification() {
    this.localNotifications.schedule({
      title: this.message,
      text: `LocalNotification schedule to ${this.date}`,
      trigger: { at: new Date(this.date) },
      led: 'FF0000',
      sound: null
    });
    setTimeout(() => {
      this.presentToast();
    }, 1000);
  }
  getAllScedule() {
    this.localNotifications.getAll().then((data) => {
      console.log('get all scedule', JSON.stringify(data));
      this.scedules = data;
    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Notification added.',
      duration: 2000
    });
    toast.present();
  }
}
