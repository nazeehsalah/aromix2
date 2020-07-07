import { TranslateService } from '@ngx-translate/core';
import { Component, ApplicationRef, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigProvider } from '../../providers/config/config';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { LoadingProvider } from '../../providers/loading/loading';
import { EmailComposer } from '@ionic-native/email-composer';
import { Http } from '@angular/http';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {

  banner: any;
  page = 1;
  name = "";
  email = "";
  id = null;
  rating = null;
  gravatar = null;
  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;
  products = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public loading: LoadingProvider,
    public http: Http,
    private applicationRef: ApplicationRef,
    private emailComposer: EmailComposer,
    public shared: SharedDataProvider,
    public translateService:TranslateService) {
    this.translateService.setDefaultLang(localStorage.languageCode);
    let d = (navParams.get('data'));

    if (d.user_email) this.email = d.user_email;
    if (d.email) this.email = d.email;
    if (d.rating) this.rating = d.rating;
    if (d.ID) this.id = d.ID;
    if (d.id) this.id = d.id;

    if (d.display_name) {
      this.name = d.display_name;
      this.banner = false;
    }
    else {
      this.name = d.first_name + " " + d.last_name;
      this.banner = d.banner;
      this.gravatar = d.gravatar;
    }
    if (this.config.showWcVendorInfo) {
      if (d.meta.pv_shop_name != '') d.name = d.meta.pv_shop_name;
      else d.name = d.first_name + " " + d.last_name;
      if (d.user_email) this.email = d.user_email;
      if (d.user_id) this.id = d.user_id;
      this.banner = d.banner;
    }
    this.getProducts();
  }
  getProducts() {
    if (this.page == 1) this.loading.show();
    this.http.get(this.config.url + '/api/appsettings/ionic_vendor_products/?insecure=cool&post_author=' + this.id + "&page=" + this.page).map(res => res.json()).subscribe(response => {
      let q = 'products?include=' + response.data + "&status=publish";
      this.config.Woocommerce.getAsync(q).then(data => {
        if (this.page == 1) this.loading.hide();
        this.infinite.complete();
        let d = JSON.parse(data.body);
        console.log(d);
        if (d.length != 0) {
          this.page++;
          for (let value of d) this.products.push(value);
        }
        if (d.length == 0 || d.length < 10) { this.infinite.enable(false); }
        this.applicationRef.tick();
      });
    });
  }
  contactUs() {
    let email = {
      to: this.email,
      subject: 'your title',
      body: 'your message'
    };
    this.emailComposer.open(email);
  }
}
