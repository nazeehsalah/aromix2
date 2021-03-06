import { TranslateService } from '@ngx-translate/core';
// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { SharedDataProvider } from '../../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../../providers/config/config';
import { trigger, style, animate, transition } from '@angular/animations';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-categories5',
  animations: [
    trigger(
      'animate', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('700ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: 'categories5.html',
})
export class Categories5Page {

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public events: Events,
    public translateService:TranslateService) {
    this.translateService.setDefaultLang(localStorage.languageCode);

  }
  ionViewDidEnter() {
    this.events.publish('footerChange', 'CategoriesPage');
  }
  openProducts(id, name) {
    this.navCtrl.push("ProductsPage", { id: id, name: name, sortOrder: 'newest' });
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

