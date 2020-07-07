import { TranslateService } from '@ngx-translate/core';
// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {
  public slides = [
    { image: "assets/intro/1.gif", title: "Home Page", icon: "home", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." },
    { image: "assets/intro/2.gif", title: "Category Page", icon: "cart", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." },
    { image: "assets/intro/3.gif", title: "Shop Page", icon: "share", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." },
    { image: "assets/intro/4.gif", title: "Cart Page", icon: "md-list-box", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." },
    { image: "assets/intro/5.gif", title: "Order Page", icon: "calendar", description: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus." }
  ];

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public events: Events,
    public translateService:TranslateService) {
    this.translateService.setDefaultLang(localStorage.languageCode);
  }
  openHomePage() {
    this.events.publish("openHomePage");
    this.config.checkingNewSettingsFromServer();
  }
}
