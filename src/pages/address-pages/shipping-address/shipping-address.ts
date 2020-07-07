import { TranslateService } from "@ngx-translate/core";
// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { ConfigProvider } from "../../../providers/config/config";
import { Http } from "@angular/http";
import { LoadingProvider } from "../../../providers/loading/loading";
import { SharedDataProvider } from "../../../providers/shared-data/shared-data";
import { LocationDataProvider } from "../../../providers/location-data/location-data";
import { UserAddressProvider } from "../../../providers/user-address/user-address";

import { IonicPage } from "ionic-angular";
@IonicPage()
@Component({
  selector: "page-shipping-address",
  templateUrl: "shipping-address.html",
})
export class ShippingAddressPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public http: Http,
    public shared: SharedDataProvider,
    public modalCtrl: ModalController,
    public loading: LoadingProvider,
    public userAddress: UserAddressProvider,
    public location: LocationDataProvider,
    public translateService: TranslateService
  ) {
    this.translateService.setDefaultLang(localStorage.languageCode);

    if (this.shared.customerData.id != null) {
      this.shared.shipping = this.shared.customerData.shipping;
      this.shared.shippingCountryName = this.location.getCountryName(
        this.shared.customerData.shipping.country
      );
      this.shared.shippingStateName = this.location.getStateName(
        this.shared.customerData.shipping.country,
        this.shared.customerData.shipping.state
      );
    }
    if (
      this.shared.shippingCountryName == "" ||
      this.shared.shippingCountryName == null
    )
      this.shared.shippingStateName = "";
  }
  disableButton() {
    if (
      this.shared.shipping.first_name == "" ||
      this.shared.shipping.last_name == "" ||
      this.shared.shipping.city == "" ||
      //this.shared.shipping.postcode == "" ||
      this.shared.shipping.state == "" ||
      this.shared.shipping.country == "" ||
      this.shared.shipping.address_1 == "" ||
      this.shared.shipping.state == null ||
      this.shared.shipping.city == null
      //||this.shared.shipping.postcode == null
    ) {
      return true;
    } else return false;
  }
  submit() {
    this.navCtrl.push("BillingAddressPage");
  }
  selectCountryPage() {
    let modal = this.modalCtrl.create("SelectCountryPage", {
      page: "shipping",
    });
    modal.present();
  }
  selectZonePage() {
    let modal = this.modalCtrl.create("SelectZonesPage", { page: "shipping" });
    modal.present();
  }

  getLocationAddress() {
    this.loading.show();
    this.userAddress.getAddress().then((value: any) => {
      this.shared.shipping.country = value.countryCode;
      this.shared.shipping.city = value.locality;
      //this.shared.shipping.postcode = value.postalCode;
      this.shared.shipping.state = this.location.getStateCode(
        value.countryCode,
        value.administrativeArea
      );
      this.shared.shippingStateName = value.administrativeArea;
      this.shared.shippingCountryName = value.countryName;
      this.shared.shipping.address_1 = value.subLocality;
      this.loading.hide();
    });
  }
}
// administrativeArea: "Punjab"
// areasOfInterest: Array(1)
// 0: "265"
// length: 1
// __proto__: Array(0)
// countryCode: "PK"
// countryName: "Pakistan"
// latitude: 31.410957
// locality: "Faisalabad"
// longitude: 73.106945
// postalCode: ""
// subAdministrativeArea: "Faisalabad"
// subLocality: "People's Colony No 1"
// subThoroughfare: ""
// thoroughfare: ""
