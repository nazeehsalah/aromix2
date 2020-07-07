import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { NavController, NavParams, InfiniteScroll, PopoverController, Events } from 'ionic-angular';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';
import { Http } from '@angular/http';
import { LoadingProvider } from '../../providers/loading/loading';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;

  page = 1;
  notifications = new Array;
  httpRunning = true;

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public http: Http,
    public loading: LoadingProvider,
    private applicationRef: ApplicationRef,
    public translate: TranslateService,
    public popoverCtrl: PopoverController,
    private events: Events,
    public translateService:TranslateService) {
    this.translateService.setDefaultLang(localStorage.languageCode);
    this.httpRunning = true;
    this.getNotifications();
    events.subscribe('cardScratched', (value) => {
      this.updateList(value);
    });
  }
  getNotifications() {
    this.httpRunning = true;
    this.loading.show();
    this.http.get(this.config.url + '/api/appusers/ionic_coupon_notification/?insecure=cool&user_id=' + this.shared.customerData.id).map(res => res.json()).subscribe(data => {
      this.httpRunning = false;
      this.loading.hide();
      let dat = data.data;

      if (this.page == 1) { this.notifications = new Array; }
      if (dat.length != 0) {
        this.page++;
        for (let value of dat) {
          this.notifications.push(value);
        }
      }
      this.infinite.enable(false);
      if (dat.length == 0) { this.infinite.enable(false); }

      this.applicationRef.tick();
      console.log(dat);
    });
  }
  openScratchCard(v) {
    let popover = this.popoverCtrl.create("ScratchCardPage", { data: v }, {});
    popover.present({
    });
  }
  refreshPage() {
    this.page = 1;
    this.getNotifications();
  }

  openShop() {
    this.navCtrl.push("ProductsPage");
  }
  ionViewDidLoad() {

  }

  updateList(data) {
    for (let v of this.notifications) {
      if (v.id == data.id) {
        v.is_view = 1;
        this.shared.toast("Congratulations you Get " + v.message + " use this code : " + v.code);
        this.http.get(this.config.url + '/api/appusers/ionic_notification_update/?insecure=cool&notification_id=' + v.id).map(res => res.json()).subscribe(data => {
          //this.loading.hide();
          let dat = data.data;
          console.log(data);
        });
      }

    }
  }


}
