import { ConfigProvider } from "./../../../providers/config/config";
import { TranslateService } from "@ngx-translate/core";
// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component, ApplicationRef } from "@angular/core";
import { NavController, NavParams, ModalController } from "ionic-angular";
import { SharedDataProvider } from "../../../providers/shared-data/shared-data";
import { LocationDataProvider } from "../../../providers/location-data/location-data";
import { IonicPage } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-billing-address",
  templateUrl: "billing-address.html",
})
export class BillingAddressPage {
  defaultAddress = false;
  constructor(
    public navParams: NavParams,
    // public config: ConfigProvider,
    //public http: Http,
    public shared: SharedDataProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public location: LocationDataProvider,
    private applicationRef: ApplicationRef,
    public config: ConfigProvider,
    public translateService: TranslateService
  ) {
    this.translateService.setDefaultLang(localStorage.languageCode);
    if (this.shared.customerData.id != null) {
      this.shared.billing = this.shared.customerData.billing;
      this.shared.billing.email = this.shared.customerData.email;
      this.shared.billingCountryName = this.location.getCountryName(
        this.shared.customerData.billing.country
      );
      this.shared.billingStateName = this.location.getStateName(
        this.shared.customerData.billing.country,
        this.shared.customerData.billing.state
      );
    }
    if (
      this.shared.billingCountryName == "" ||
      this.shared.billingCountryName == null
    )
      this.shared.billingStateName = "";
  }
  // <!-- 2.0 updates -->
  setAddress(value) {
    if (this.defaultAddress == false) this.defaultAddress = true;
    else this.defaultAddress = false;
    this.shared.sameAddress = this.defaultAddress;
    console.log(this.defaultAddress);
    if (this.defaultAddress == true) {
      console.log(" billing ==shipping");
      this.shared.billing.first_name = this.shared.shipping.first_name;
      this.shared.billing.last_name = this.shared.shipping.last_name;
      this.shared.billing.state = this.shared.shipping.state;
      //this.shared.billing.postcode = this.shared.shipping.postcode;
      this.shared.billing.country = this.shared.shipping.country;
      this.shared.billing.address_1 = this.shared.shipping.address_1;
      this.shared.billing.address_2 = this.shared.shipping.address_2;
      this.shared.billing.city = this.shared.shipping.city;
      this.shared.billing.company = this.shared.shipping.company;
      this.shared.billingCountryName = this.shared.shippingCountryName;
      this.shared.billingStateName = this.shared.shippingStateName;
    } else {
      if (this.shared.customerData.id != null) {
        console.log("changing customer data billing");
        console.log(this.shared.customerData);
        this.shared.billing = this.shared.customerData.billing;
        this.shared.billingCountryName = this.location.getCountryName(
          this.shared.customerData.billing.country
        );
        this.shared.billingStateName = this.location.getStateName(
          this.shared.customerData.billing.country,
          this.shared.customerData.billing.state
        );
      } else {
        console.log("changing customer data to null for guest");
        this.shared.billing.first_name = "";
        this.shared.billing.last_name = "";
        this.shared.billing.state = "";
        //this.shared.billing.postcode = "";
        this.shared.billing.country = "";
        this.shared.billing.address_1 = "";
        this.shared.billing.address_2 = "";
        this.shared.billing.city = "";
        this.shared.billing.company = "";
        this.shared.billingCountryName = "";
        this.shared.billingStateName = "";
      }
    }
    this.applicationRef.tick();
  }
  submit() {
    if (this.config.checkOutPage == 2) this.navCtrl.push("OrderPage");
    else this.openOrderPage();
    /* this.navCtrl.push("ShippingMethodPage");
    this.applicationRef.tick(); */
  }
  /* proceedOrder() {
    if (this.config.checkOutPage == 2) this.navCtrl.push("OrderPage");
    else this.openOrderPage();
  } */
  //=====================================================================================================================
  openOrderPage() {
    let customer_id = 0; // <!-- 2.0 updates -->
    if (this.shared.customerData.id != null)
      customer_id = this.shared.customerData.id; // <!-- 2.0 updates -->
    let token = null; // <!-- 2.0 updates -->
    if (this.shared.customerData.cookie != null)
      token = this.shared.customerData.cookie; // <!-- 2.0 updates -->
    let onePage = this.config.checkOutPage;

    var data = {
      token: token, // <!-- 2.0 updates -->
      // payment_method: this.selectedPaymentMethod,
      // payment_method_title: this.selectedPaymentMethodTitle,
      billing_info: this.shared.billing,
      shipping_info: this.shared.shipping,
      products: this.getProducts(),
      shipping_ids: this.shared.shipping_lines,
      coupons: this.getCoupons(),
      customer_note: "",
      customer_id: customer_id, // <!-- 2.0 updates -->
      sameAddress: this.shared.sameAddress,
      one_page: onePage,
      platform: this.shared.device,
    };
    console.log(data);
    this.shared.openCheckoutWebview(data);
  }
  //=================================================================================================================================
  getProducts() {
    var data = [];
    for (let v of this.shared.cartProducts) {
      var obj = {
        quantity: v.quantity,
        product_id: v.product_id,
        total: v.total.toString(),
      };
      if (v.variation_id) Object.assign(obj, { variation_id: v.variation_id });
      //if (v.meta_data) Object.assign(obj, { meta_data: v.meta_data })
      data.push(obj);
    }
    return data;
  }
  //=================================================================================================================================
  //Object.assign(c, JSON.parse(data.body)
  getCoupons() {
    var data = [];
    for (let v of this.shared.couponArray) {
      data.push({ code: v.code, discount: v.amount });
    }
    return data;
  }
  //
  selectCountryPage() {
    let modal = this.modalCtrl.create("SelectCountryPage", { page: "billing" });
    modal.present();
  }
  selectZonePage() {
    let modal = this.modalCtrl.create("SelectZonesPage", {
      page: "billing",
      id: this.shared.billing.country,
    });
    modal.present();
  }
  disableButton() {
    if (
      this.shared.billing.first_name == "" ||
      this.shared.billing.last_name == "" ||
      this.shared.billing.city == "" ||
      //this.shared.billing.postcode == "" ||
      this.shared.billing.state == "" ||
      this.shared.billing.country == "" ||
      this.shared.billing.address_1 == "" ||
      this.shared.billing.phone == "" ||
      this.shared.billing.email == "" ||
      this.shared.billing.state == null ||
      this.shared.billing.city == null ||
      //this.shared.billing.postcode == null ||
      this.shared.billing.phone == null
    ) {
      return true;
    } else return false;
  }
}
