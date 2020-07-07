// Project Name: Ionic woocommerce
// Project URI: http://themes-coder.com/products/ionic-woocommerce/
// Author: themes-coder Team
// Author URI: http://themes-coder.com/

import { Injectable, ApplicationRef } from "@angular/core";
import { Http } from "@angular/http";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Storage } from "@ionic/storage";
import { Platform, Events } from "ionic-angular";
import * as WC from "woocommerce-api";
import { AlertProvider } from "../alert/alert";
import { Geofence } from "@ionic-native/geofence";
import * as $ from "jquery";

if (localStorage.languageCode == undefined) {
  localStorage.languageCode = "en"; //default language code
  localStorage.languageDirection = "ltr"; //default language direction of app
  localStorage.currency = "EGP"//"&#36;"; //default currecny html code to show in app.
  // Please visit this link to get your html code  https://html-css-js.com/html/character-codes/currency/
  localStorage.currencyCode = "EGP"//"USD"; //default currency code
  localStorage.currencyPos = "left"; //default currency position
  localStorage.decimals = 2; //default currecny decimal
}

@Injectable()
export class ConfigProvider {
  public url: string = "https://aromixgroup.com";
  public consumerKey: string = "ck_e47766501c608ccd5fe74c67897850bcab3f5075";
  public consumerSecret: string = "cs_aaff8ddb9fa87ed3fe3c1438d23906a4859c94de";

  public showIntroPage = 0; // show/hide intro page value 1 for show, 0 for hide
  public appInProduction = true;
  public productSlidesPerPage = 2.5;
  
  public onesignalAppId = "2bb229af-9f1c-4769-bcf1-1603fc04cd20";
  public onesignalSenderId = "301051371319";

  public googleMapId = "";

  public admob = 1; // show/hide ads on android value 1 for show, 0 for hide
  public admobBannerid = "ca-app-pub-9403078125521619/1892804083";
  public admobIntid = "ca-app-pub-9403078125521619~9362786919";
  public admobIos = 0; // show/hide ads on ios value 1 for show, 0 for hide
  public admobBanneridIos = "";
  public admobIntidIos = "";

  public languageCode = localStorage.languageCode; //default language of app
  public languageDirection = localStorage.languageDirection; //default direction of app
  public appDirection: any = this.languageDirection; // application direction
  public currency = localStorage.currency;
  public productsArguments =
    "lang=" +
    localStorage.languageCode +
    "&currency=" +
    localStorage.currencyCode; //additional product arguments for query

  Woocommerce = WC({
    url: this.url,
    consumerKey: this.consumerKey,
    consumerSecret: this.consumerSecret,
    wpAPI: true,
    queryStringAuth: true,
    version: "wc/v2"
  });

  public urlExt: string = this.url + "/wp-json/woo_app_connect/mobile/";
  public langId: string = "1";
  public loader = "dots";
  public newProductDuration = 20;
  public cartButton = 1; //1 = show and 0 = hide

  public currencyPos = localStorage.currencyPos;
  public address;
  public fbId;
  public email;
  public latitude;
  public longitude;
  public phoneNo;
  public notifText;
  public notifTitle;
  public notifDuration;
  public footerShowHide;
  public homePage = 1;
  public categoryPage = 1;
  public siteUrl = "";
  public appName = "";
  public packgeName = 1;
  public introPage = 1;
  public myOrdersPage = 1;
  public newsPage = 1;
  public wishListPage = 1;
  public shippingAddressPage = 1;
  public aboutUsPage = 1;
  public contactUsPage = 1;
  public editProfilePage = 1;
  public settingPage = 1;

  public rateApp = 1;
  public shareApp = 1;
  public fbButton = 1;
  public googleButton = 1;
  public notificationType = "";
  public privacyPolicy = "";
  public termServices = "";
  public aboutUs = "";
  public refundPolicy = "";
  public filterMaxPrice = 1000;
  public guestCheckOut = true;
  public checkOutPage = 1;
  public defaultIcons = false;
  public orderCancelButton = false;
  public addressPage = true;
  public downloadPage = true;
  public cancelOrderTime: number;
  public showVendorInfo = false; //for dokan plugin
  public showWcVendorInfo = false;
  public multiLanguage = false;
  public multiCurrency = false;
  public appSettings: { [k: string]: any } = {};
  public enableGeoFencing: boolean = false;
  public enableDeliveryTracking: boolean = false;
  public enableWpPointReward: boolean = false;
  public trackingUrl = "";
  public currentSettings = 1;

  constructor(
    public http: Http,
    private storage: Storage,
    public platform: Platform,
    public alrt: AlertProvider,
    private localNotifications: LocalNotifications,
    private applicationRef: ApplicationRef,
    private geofence: Geofence,
    public events: Events
  ) {
    this.saveDefaultCurrency();
  }

  public siteSetting() {
    return new Promise(resolve => {
      this.storage.get("appSettings").then(val => {
        if (val == null) {
          this.http
            .get(this.url + "/api/appsettings/get_all_settings/?insecure=cool")
            .map(res => res.json())
            .subscribe(data => {
              this.appSettings = data;
              this.storage.set("appSettings", this.appSettings);
              this.defaultSettings();
              this.events.publish("settingsLoaded");
              resolve();
            });
        } else {
          this.appSettings = val;
          this.defaultSettings();
          this.events.publish("settingsLoaded");
          resolve();
        }
      });
    });
  }
  defaultSettings() {
    this.homePage = parseInt(this.appSettings.home_style);
    this.categoryPage = parseInt(this.appSettings.category_style);
    this.introPage = parseInt(this.appSettings.intro_page);
    this.myOrdersPage = parseInt(this.appSettings.my_orders_page);
    this.newsPage = parseInt(this.appSettings.news_page);
    this.wishListPage = parseInt(this.appSettings.wish_list_page);
    this.shippingAddressPage = parseInt(this.appSettings.shipping_address_page);
    this.aboutUsPage = parseInt(this.appSettings.about_us_page);
    this.contactUsPage = this.appSettings.contact_us_page;
    this.editProfilePage = parseInt(this.appSettings.edit_profile_page);

    this.settingPage = parseInt(this.appSettings.setting_page);
    //this.currency = this.appSettings.currency_symbol;
    this.cartButton = parseInt(this.appSettings.cart_button);
    this.footerShowHide = parseInt(this.appSettings.footer_button);
    this.addressPage = this.appSettings.bill_ship_info == "1" ? true : false;
    this.downloadPage = this.appSettings.downloads == "1" ? true : false;
    this.multiLanguage = this.appSettings.wpml_enabled == "1" ? true : false;

    this.multiCurrency =
      this.appSettings.wp_multi_currency == "1" ? true : false;
    this.showVendorInfo = this.appSettings.mvf_enabled == "1" ? true : false;
    this.showWcVendorInfo = this.appSettings.mvf_enabled == "2" ? true : false;
    this.enableGeoFencing = this.appSettings.geo_fencing == "1" ? true : false;
    this.enableDeliveryTracking =
      this.appSettings.delivery_tracking == "1" ? true : false;
    this.enableWpPointReward =
      this.appSettings.wp_point_reward == "1" ? true : false;

    this.rateApp = parseInt(this.appSettings.rate_app);
    this.shareApp = parseInt(this.appSettings.share_app);
    this.defaultIcons =
      this.appSettings.sidebar_menu_icon == "1" ? false : true;
    this.currentSettings = this.appSettings.update_order;

    this.events.publish("openDeepLink");
    //this.initializeGeoFence();
  }

  checkingNewSettingsFromServer() {
    this.http
      .get(this.url + "/api/appsettings/get_all_settings/?insecure=cool")
      .map(res => res.json())
      .subscribe(data => {
        var settings = data;
        this.address =
          settings.address +
          ", " +
          settings.city +
          ", " +
          settings.state +
          " " +
          settings.zip +
          ", " +
          settings.country;
        this.email = settings.contact_us_email;
        this.latitude = settings.latitude;
        this.longitude = settings.longitude;
        this.phoneNo = settings.phone_no;
        this.newProductDuration = settings.new_product_duration;
        this.notifText = settings.notification_text;
        this.notifTitle = settings.notification_title;
        this.notifDuration = settings.notification_duration;
        this.packgeName = this.appSettings.package_name;
        this.setLocalNotification();
        this.appName = settings.app_name;

        this.fbButton = parseInt(settings.facebook_login);
        this.siteUrl = this.appSettings.site_url;

        this.privacyPolicy = settings.privacy_page;
        this.termServices = settings.terms_page;
        this.aboutUs = settings.about_page;
        this.refundPolicy = settings.refund_page;
        this.filterMaxPrice = parseInt(settings.filter_max_price);

        this.guestCheckOut = settings.checkout_process == "yes" ? true : false;

        this.checkOutPage = parseInt(settings.one_page_checkout);
        //this.checkOutPage = 2;

        this.orderCancelButton =
          settings.cancel_order_button == "1" ? true : false;

        this.cancelOrderTime = parseInt(settings.cancel_order_hours);
        this.trackingUrl = settings.tracking_url;
        this.applicationRef.tick();
        this.reloadingWithNewSettings(settings);
      });
  }
  reloadingWithNewSettings(data) {
    console.log(this.currentSettings + " setting cahnge " + data.update_order);

    if (this.currentSettings != data.update_order) {
      if (data.wp_multi_currency == "0") this.restoreDefaultCurrency();
      this.alrt.showWithTitle(
        "Reloading App Please Wait!",
        "New Updates Received"
      );

      this.storage.set("appSettings", data).then(function() {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
    }
  }
  //Subscribe for local notification when application is start for the first time
  setLocalNotification() {
    console.log('localNotification called');
   this.platform.ready().then(() => {
      this.storage.get("localNotification").then(val => {
        console.log("localNotification",val)
        if (val == null) {
          //console.log('localNotification configured');
          this.storage.set("localNotification", "localNotification");
          this.localNotifications.schedule({
            id: 1,
            title: this.notifTitle,
            text: this.notifText,
            //every: this.notifDuration
          });
        }
      });
    });
  }
  saveDefaultCurrency() {
    if (localStorage.appStartFirstTime == undefined) {
      localStorage.currencyDefault = localStorage.currency; //default currecny symbol to show in app
      localStorage.currencyCodeDefault = localStorage.currencyCode; //default currency code
      localStorage.currencyPosDefault = localStorage.currencyPos; //default currency position
      localStorage.decimalsDefault = localStorage.decimals; //default currecny decimal
      localStorage.appStartFirstTime = "started";
    }
  }
  restoreDefaultCurrency() {
    if (localStorage.appStartFirstTime == "started") {
      localStorage.currency = localStorage.currencyDefault; //default currecny symbol to show in app
      localStorage.currencyCode = localStorage.currencyCodeDefault; //default currency code
      localStorage.currencyPos = localStorage.currencyPosDefault; //default currency position
      localStorage.decimals = localStorage.decimalsDefault; //default currecny decimal
    }
  }

  initializeGeoFence() {
    if (this.enableGeoFencing) {
      // initialize the plugin
      this.geofence.initialize().then(
        // resolved promise does not return a value
        () => {
          console.log("Geofence Plugin Ready");
          //banners
          this.http
            .get(
              this.url +
                "/api/appsettings/ionic_get_geofencing_posts/?insecure=cool"
            )
            .map(res => res.json())
            .subscribe(data => {
              let d = data.data;
              // Object.assign(JSON.parse(data.body), { quantity: 0 })
              for (let v of d) {
                let radius = parseInt(v.radius) * 1000;
                let des = $("<textarea />")
                  .html(v.content)
                  .text();
                this.addGeofence(
                  v.id,
                  v.id,
                  v.latitude,
                  v.longitude,
                  radius,
                  v.title,
                  v.content
                );
              }
            });
        },
        err => console.log(err)
      );
    }
  }
  private addGeofence(id, idx, lat, lng, radius, place, desc) {
    let fence = {
      id: id,
      latitude: lat,
      longitude: lng,
      radius: radius,
      transitionType: 3,
      notification: {
        id: idx,
        title: place,
        text: desc,
        openAppOnClick: true
      }
    };

    this.geofence
      .addOrUpdate(fence)
      .then(
        () => console.log("Geofence added"),
        err => console.log("Geofence failed to add")
      );
  }

  // calculateDistanceBetween2Points(lat1, lon1, lat2, lon2) {
  //   var R = 3958.756; // miles
  //   var dLat = (lat2 - lat1) * Math.PI / 180;
  //   var dLon = (lon2 - lon1) * Math.PI / 180;
  //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  //     Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c;
  //   return Math.round(d);
  // }
}
