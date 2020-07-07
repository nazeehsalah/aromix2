import { TranslateService } from '@ngx-translate/core';
// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public navParams: NavParams,
    public translateService:TranslateService) {
    this.translateService.setDefaultLang(localStorage.languageCode);

  }
  openHome() {
    if (this.config.homePage == 1) { this.navCtrl.setRoot("HomePage"); }
    if (this.config.homePage == 2) { this.navCtrl.setRoot("Home2Page"); }
    if (this.config.homePage == 3) { this.navCtrl.setRoot("Home3Page"); }
    if (this.config.homePage == 4) { this.navCtrl.setRoot("Home4Page"); }
    if (this.config.homePage == 5) { this.navCtrl.setRoot("Home5Page"); }
  }
  openOrders() { this.navCtrl.setRoot("MyOrdersPage"); }

  ionViewDidLoad() {
    this.shared.orderComplete();
  }
  openCart() {
    this.navCtrl.push("CartPage");
  }
  openSearch() {
    this.navCtrl.push("SearchPage");
  }
  ionViewWillEnter() {
    if (this.config.admob == 1) this.shared.showAd();
  }
}
