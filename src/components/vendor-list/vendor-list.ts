import { Component, ApplicationRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConfigProvider } from '../../providers/config/config';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../providers/loading/loading';
@Component({
  selector: 'vendor-list',
  templateUrl: 'vendor-list.html'
})
export class VendorListComponent {


  constructor(
    public navCtrl: NavController,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public loading: LoadingProvider,
    public http: Http,
    public translate: TranslateService,
    private applicationRef: ApplicationRef,
  ) {
  }


  openVendorPage(c) {

    if (this.config.showVendorInfo) {
      this.loading.show();
      this.http.get(this.config.url + "/wp-json/dokan/v1/stores/" + c.user_id).map(res => res.json()).subscribe(data => {
        this.loading.hide();
        let d = data;
        this.navCtrl.push("StorePage", { data: d });
        this.applicationRef.tick();
      });
    }
    else if (this.config.showWcVendorInfo) {
      //this.loading.show();
      this.navCtrl.push("StorePage", { data: c });
      // this.http.get(this.config.url + "/api/appsettings/get_vendor_info/?insecure=cool&product_id=" + c.user_id).map(res => res.json()).subscribe(data => {
      //   this.loading.hide();
        
      //   this.applicationRef.tick();
      // });
    }
  }
}
