import { IonicPage } from 'ionic-angular';
// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../../../providers/config/config';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../../providers/shared-data/shared-data';
import { trigger, style, animate, transition } from '@angular/animations';
import { NavController, Content, Events, Slides } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-home3',
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
  templateUrl: 'home3.html',
})

export class Home3Page {
  @ViewChild(Content) content: Content;
  @ViewChild('recentSlider') recentSlider: Slides;
  constructor(
    public http: Http,
    public config: ConfigProvider,
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public events: Events,
    public translateService:TranslateService) {
    this.translateService.setDefaultLang(localStorage.languageCode);
      events.subscribe('recentDeleted', () => {
        console.log("clicked recent");
        this.recentSlider.update();
        this.recentSlider.resize();
        this.recentSlider.slidePrev();
      });
  }
  openProducts(value) {
    this.navCtrl.push("ProductsPage", { type: value });
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
  ionViewDidEnter() {
    this.events.publish('footerChange', 'HomePage');
  }

}
