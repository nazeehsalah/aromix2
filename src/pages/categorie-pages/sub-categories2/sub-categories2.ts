import { TranslateService } from '@ngx-translate/core';
// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SharedDataProvider } from '../../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../../providers/config/config';
import { trigger, style, animate, transition } from '@angular/animations';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-sub-categories2',
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
  templateUrl: 'sub-categories2.html',
})
export class SubCategories2Page {
  parent;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public translateService:TranslateService) {
    this.translateService.setDefaultLang(localStorage.languageCode);
    this.parent = navParams.get("parent");
  }
  openParentProducts() {
    this.navCtrl.push("ProductsPage", { id: this.parent, name: name, sortOrder: 'newest' });
  }
  openProducts(id, name) {
    let count = 0;
    for (let val of this.shared.allCategories) {
      if (val.parent == id) {
        count++;
        //console.log(val.parent + "   " + id);
      }
    }
    console.log(count);
    if (count == 0)
      this.navCtrl.push("ProductsPage", { id: id, name: name, sortOrder: 'newest' });
    else
      this.navCtrl.push("SubCategories2Page", { 'parent': id });


  }
  openCart() {
    this.navCtrl.push("CartPage");
  }
  openSearch() {
    this.navCtrl.push("SearchPage");
  }
}
