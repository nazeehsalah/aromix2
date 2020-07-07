import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from './../../providers/shared-data/shared-data';
import { ConfigProvider } from './../../providers/config/config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications
  constructor(
    public config: ConfigProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public shared:SharedDataProvider,
    public translateService:TranslateService
    ) {
      this.translateService.setDefaultLang(localStorage.languageCode);
    this.shared.returnNotifiactionsData().then(res=>{
      this.notifications=res
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}
