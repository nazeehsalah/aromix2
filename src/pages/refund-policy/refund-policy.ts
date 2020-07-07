// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { TranslateService } from '@ngx-translate/core';
import { ConfigProvider } from '../../providers/config/config';
import { IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-refund-policy',
  templateUrl: 'refund-policy.html',
})
export class RefundPolicyPage {

  constructor(
    public viewCtrl: ViewController,
    public config: ConfigProvider,
    public sharedData: SharedDataProvider,
    public translateService:TranslateService) {
    this.translateService.setDefaultLang(localStorage.languageCode);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


}
