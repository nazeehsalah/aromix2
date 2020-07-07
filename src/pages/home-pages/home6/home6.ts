import { IonicPage } from 'ionic-angular';
// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../../../providers/config/config';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../../providers/shared-data/shared-data';
import { trigger, style, animate, transition } from '@angular/animations';
import { NavController, Content, Events } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-home6',
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
  templateUrl: 'home6.html',
})

export class Home6Page {
  @ViewChild(Content) content: Content;
  constructor(
    public http: Http,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    public events: Events,
    private applicationRef: ApplicationRef,
    public translateService:TranslateService) {
    this.translateService.setDefaultLang(localStorage.languageCode);
  }
  scrollTopButton = false;
  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }

  onScroll(e) {

    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
    //else this.scrollTopButton=false;
    //   console.log(e);
  }

  ngAfterViewChecked() {
    this.content.resize();
  }
  openCart() {
    this.navCtrl.push("CartPage");
  }
  openSearch() {
    this.navCtrl.push("SearchPage");
  }

  openProducts(value) {
    this.navCtrl.push("ProductsPage", { type: value });
  }

  ionViewDidEnter() {
    this.events.publish('footerChange', 'HomePage');
  }
  openCategoryPage() {
    this.events.publish("openCategoryPage");
  }


}
