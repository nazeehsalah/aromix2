// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/

import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { ConfigProvider } from '../providers/config/config';
import { SharedDataProvider } from '../providers/shared-data/shared-data';
import { Network } from '@ionic-native/network';
import { AlertProvider } from '../providers/alert/alert';
import { LoadingProvider } from '../providers/loading/loading';
import { trigger, transition, animate, style } from '@angular/animations';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as $ from "jquery";
import { Deeplinks } from '@ionic-native/deeplinks';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
@Component({
  animations: [
    trigger(
      'animate', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('500ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  homeList = false;
  homeListIcon = 'add';
  categoriesList = false;
  categoriesListIcon = 'add';
  shopList = false;
  shopListIcon = 'add';
  constructor(
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public platform: Platform,
    public modalCtrl: ModalController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
    public storage: Storage,
    public network: Network,
    public alert: AlertProvider,
    public loading: LoadingProvider,
    private admobFree: AdMobFree,
    public events: Events,
    public plt: Platform,
    private appVersion: AppVersion,
    public iab: InAppBrowser,
    private socialSharing: SocialSharing,
    //private applicationRef: ApplicationRef,
    private deeplinks: Deeplinks,
    private push: Push,
  ) {

    //if (!this.platform.is('cordova')) this.rootPage = HomePage;
    this.initializeApp();

    let connectedToInternet = true;
    network.onDisconnect().subscribe(() => {
      connectedToInternet = false;
      translate.get(["Please Connect to the Internet!", "Disconnected"]).subscribe((res) => {
        this.alert.showWithTitle(res["Please Connect to the Internet!"], res["Disconnected"]);
      });
      //  console.log('network was disconnected :-(');
    });


    network.onConnect().subscribe(() => {
      if (!connectedToInternet) {
        window.location.reload();
        //this.loading.show();
        //console.log('network connected!');
        translate.get(["Network connected Reloading Data", "Connected"]).subscribe((res) => {
          this.alert.showWithTitle(res["Network connected Reloading Data"] + '...', res["Connected"]);
        });

      }
      //connectSubscription.unsubscribe();
    });
    this.platform.setDir(this.config.appDirection, true);
    shared.dir = this.config.appDirection;
    //setting default languge on start up 
    console.log("lang=====>   "+localStorage.languageCode)
    translate.setDefaultLang(localStorage.languageCode);

    events.subscribe('showAd', () => {
      this.showInterstitial();
    });


    events.subscribe('openThankYouPage', () => {
      this.nav.setRoot("ThankYouPage");
    });
    events.subscribe('openShippingAddressPage', () => {
      //console.log("opening Shipping Address Page");
      this.nav.push("ShippingAddressPage");
    });
    events.subscribe('openDeepLink', (value) => {
      console.log("subscibe")
      this.naviagateDeeplink(value);
    });
    events.subscribe('openCategoryPage', (value) => {
      this.openCategoryPage();
    });
    events.subscribe('openHomePage', (value) => {
      this.openHomePage();
    });
    events.subscribe('openSubcategoryPage', (value) => {
      this.openSubcategoryPage(value);
    });
  }
  setupPush(){
    const options: PushOptions = {
      android: {
        senderID:"301051371319",
        //forceShow:true
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
    const pushObject: PushObject = this.push.init(options);
    pushObject.on('notification').subscribe((notification: any) => {
      /* console.log('Received a notification', notification); */
      /* this.storage.set("fire3",notification) */
      this.shared.updateNotifcationStorge({
        payload:{
          title:notification.title,
          body:notification.message
        }
      })
      if(notification.additionalData.foreground){
        this.alert.showWithTitle(notification.message,notification.title)
      }
    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.setupPush()
     // let value = this.getStatusBarColor();
      this.statusBar.hide();
      //this.statusBar.backgroundColorByHexString(value);

      this.shared.subscribePush();
      this.runAdmob();
      this.config.siteSetting().then((value) => {
        this.loadHomePage();
        //this.shared.getVendorList();

      });
      if (this.platform.is('cordova')) {
        this.initializeDeepLinks();
      }
    });
  }

  // loading home page =========================================================================
  loadHomePage() {
    this.storage.get('firsttimeApp').then((val) => {
      let value = val;
      if (this.config.showIntroPage == 0) value = 'firstTime';
      if (value == 'firstTime') {
        if (this.config.homePage == 1) { this.rootPage = "HomePage"; }
        if (this.config.homePage == 2) { this.rootPage = "Home2Page"; }
        if (this.config.homePage == 3) { this.rootPage = "Home3Page"; }
        if (this.config.homePage == 4) { this.rootPage = "Home4Page"; }
        if (this.config.homePage == 5) { this.rootPage = "Home5Page"; }
        if (this.config.homePage == 6) { this.rootPage = "Home6Page"; }
        if (this.config.homePage == 7) { this.rootPage = "Home7Page"; }
        if (this.config.homePage == 8) { this.rootPage = "Home8Page"; }
        if (this.config.homePage == 9) { this.rootPage = "Home9Page"; }
        if (this.config.homePage == 10) { this.rootPage = "Home10Page"; }
        this.config.checkingNewSettingsFromServer();
      }
      else {
        this.nav.push("IntroPage");
      }
      this.storage.set('firsttimeApp', 'firstTime');
      setTimeout(() => {
        this.events.publish("openDeepLink");
      }, 500);

      setTimeout(() => {
        this.splashScreen.hide();
      }, 700);
    });
  }
  // starting admob =========================================================================
  runAdmob() {
    if (this.plt.is('ios')) {
      if (this.config.admobIos == 1) this.initializeAdmob(this.config.admobBanneridIos, this.config.admobIntidIos);
      this.config.admob = this.config.admobIos;
      this.shared.device = 'ios';
    } else if (this.plt.is('android')) {
      if (this.config.admob == 1) this.initializeAdmob(this.config.admobBannerid, this.config.admobIntid);
      this.shared.device = 'android';
    }
  }
  // preparing admob =========================================================================
  initializeAdmob(bannerId, intId) {
    if (this.platform.is('cordova')) {
      const bannerConfig: AdMobFreeBannerConfig = {
        id: bannerId,
        isTesting: false,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);

      this.admobFree.banner.prepare()
        .then(() => {
          //alert("loaded" +bannerId);
          //this.admobFree.banner.show();
        })
        .catch(e => console.log(e));

      const interstitialConfig: AdMobFreeInterstitialConfig = {
        id: intId,
        isTesting: false,
        autoShow: false
      };
      this.admobFree.interstitial.config(interstitialConfig);
      this.admobFree.interstitial.prepare();
    }
  }
  //=========================================================================
  showInterstitial() {
    if (this.platform.is('cordova')) {
      this.admobFree.interstitial.show();
      //this.admobFree.interstitial.isReady().then(() => { });
      this.admobFree.interstitial.prepare();
    }
  }
  //=========================================================================
  openPage(page) {
    if (page == 'home') this.openHomePage();
    else if (page == 'home1') this.nav.setRoot("HomePage");
    else if (page == 'home2') this.nav.setRoot("Home2Page");
    else if (page == 'home3') this.nav.setRoot("Home3Page");
    else if (page == 'home4') this.nav.setRoot("Home4Page");
    else if (page == 'home5') this.nav.setRoot("Home5Page");
    else if (page == 'home6') this.nav.setRoot("Home6Page");
    else if (page == 'home7') this.nav.setRoot("Home7Page");
    else if (page == 'home8') this.nav.setRoot("Home8Page");
    else if (page == 'home9') this.nav.setRoot("Home9Page");
    else if (page == 'home10') this.nav.setRoot("Home10Page");
    else if (page == 'categories') this.openCategoryPage();
    else if (page == 'categories1') this.nav.setRoot("CategoriesPage");
    else if (page == 'categories2') this.nav.setRoot("Categories2Page");
    else if (page == 'categories3') this.nav.setRoot("Categories3Page");
    else if (page == 'categories4') this.nav.setRoot("Categories4Page");
    else if (page == 'categories5') this.nav.setRoot("Categories5Page");
    else if (page == 'categories6') this.nav.setRoot("Categories6Page");
    else if (page == 'products') this.nav.setRoot("ProductsPage");
    else if (page == 'myWishList') this.nav.setRoot("WishListPage");
    else if (page == 'myAccount') this.nav.setRoot("MyAccountPage");
    else if (page == 'myOrders') this.nav.setRoot("MyOrdersPage");
    else if (page == 'addresses') this.nav.setRoot("AddressesPage");
    else if (page == 'downloads') this.nav.setRoot("DownloadsPage");
    else if (page == 'contactUs') this.nav.setRoot("ContactUsPage");
    else if (page == 'aboutUs') this.nav.setRoot("AboutUsPage");
    else if (page == 'news') this.nav.setRoot("NewsPage");
    else if (page == 'intro') this.nav.setRoot("IntroPage");
    else if (page == 'settings') this.nav.setRoot("SettingsPage");
    else if (page == 'latest') this.nav.push("ProductsPage", { type: 'latest' });
    else if (page == 'sale') this.nav.push("ProductsPage", { type: 'sale' });
    else if (page == 'featured') this.nav.push("ProductsPage", { type: 'featured' });
    else if (page == 'rewardPoints') this.nav.setRoot("RewardPointsPage");
    else if (page == 'notifications') this.nav.setRoot("NotificationsPage");

  }
  openHomePage() {
    if (this.config.homePage == 1) { this.nav.setRoot("HomePage"); }
    if (this.config.homePage == 2) { this.nav.setRoot("Home2Page"); }
    if (this.config.homePage == 3) { this.nav.setRoot("Home3Page"); }
    if (this.config.homePage == 4) { this.nav.setRoot("Home4Page"); }
    if (this.config.homePage == 5) { this.nav.setRoot("Home5Page"); }
    if (this.config.homePage == 6) this.nav.setRoot("Home6Page");
    if (this.config.homePage == 7) this.nav.setRoot("Home7Page");
    if (this.config.homePage == 8) this.nav.setRoot("Home8Page");
    if (this.config.homePage == 9) this.nav.setRoot("Home9Page");
    if (this.config.homePage == 10) this.nav.setRoot("Home10Page");
  }
  openCategoryPage() {
    if (this.config.categoryPage == 1) { this.nav.setRoot("CategoriesPage"); }
    if (this.config.categoryPage == 2) { this.nav.setRoot("Categories2Page"); }
    if (this.config.categoryPage == 3) { this.nav.setRoot("Categories3Page"); }
    if (this.config.categoryPage == 4) { this.nav.setRoot("Categories4Page"); }
    if (this.config.categoryPage == 5) { this.nav.setRoot("Categories5Page"); }
    if (this.config.categoryPage == 6) { this.nav.setRoot("Categories6Page"); }
  }
  openSubcategoryPage(parent) {
    if (this.config.categoryPage == 1) { this.nav.push("SubCategoriesPage", { 'parent': parent }); }
    if (this.config.categoryPage == 2) { this.nav.push("SubCategories2Page", { 'parent': parent }); }
    if (this.config.categoryPage == 3) { this.nav.push("SubCategories3Page", { 'parent': parent }); }
    if (this.config.categoryPage == 4) { this.nav.push("SubCategories4Page", { 'parent': parent }); }
    if (this.config.categoryPage == 5) { this.nav.push("SubCategories5Page", { 'parent': parent }); }
    if (this.config.categoryPage == 6) { this.nav.push("SubCategories6Page", { 'parent': parent }); }
  }


  openLoginPage() {
    let modal = this.modalCtrl.create("LoginPage", { hideGuestLogin: true });// <!-- 2.0 updates -->
    modal.present();
  }
  openSignUpPage() {
    let modal = this.modalCtrl.create("SignUpPage");
    modal.present();
  }
  logOut() {
    this.shared.logOut();
  }
  showHideHomeList() {
    if (this.homeList == false) { this.homeList = true; this.homeListIcon = 'remove'; }
    else { this.homeList = false; this.homeListIcon = 'add'; }
  }
  showHideCategoriesList() {
    if (this.categoriesList == false) { this.categoriesList = true; this.categoriesListIcon = 'remove'; }
    else { this.categoriesList = false; this.categoriesListIcon = 'add'; }
  }
  showHideShopList() {
    if (this.shopList == false) { this.shopList = true; this.shopListIcon = 'remove'; }
    else { this.shopList = false; this.shopListIcon = 'add'; }
  }
  ionViewWillEnter() {
    //console.log("ionViewCanEnter");
  }
  rateUs() {
    this.loading.autoHide(2000);
    if (this.plt.is('ios')) {
      this.iab.create(this.config.packgeName.toString(), "_system");
    } else if (this.plt.is('android')) {
      this.appVersion.getPackageName().then((val) => {
        this.iab.create("https://play.google.com/store/apps/details?id=" + val, "_system");
      });
    }
  }
  share() {
    this.loading.autoHide(2000);
    if (this.plt.is('ios')) {
      this.socialSharing.share(
        this.config.packgeName.toString(),
        this.config.appName,
        this.config.packgeName.toString(),
        this.config.packgeName.toString()
      ).then(() => {
      }).catch(() => {

      });
    } else if (this.plt.is('android')) {

      this.appVersion.getPackageName().then((val) => {
        this.socialSharing.share(
          this.config.appName,
          this.config.appName,
          "",
          "https://play.google.com/store/apps/details?id=" + val
        ).then(() => {

        }).catch(() => {
        });
      });
    }
  }
  openLanguagePage() {
    let modal = this.modalCtrl.create("LanguagePage");
    modal.present();
  }
  openCurrencyPage() {
    let modal = this.modalCtrl.create("CurrencyListPage");
    modal.present();
  }
  getStatusBarColor() {
    let headerColor = $('#primary').css('color');
    let rgb2 = headerColor;
    rgb2 = headerColor.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    this.shared.headerHexColor = (rgb2 && rgb2.length === 4) ? "#" +
      ("0" + parseInt(rgb2[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb2[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb2[3], 10).toString(16)).slice(-2) : headerColor;
    //console.log(this.shared.headerHexColor);

    let color = $('#my').css('color');
    let rgb = color;
    rgb = color.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : color;
  }
  public link = "empty";
  public linkArgs: any;
  public deepUrl = ""
  initializeDeepLinks() {
    //this.deeplinks.routeWithNavController(this.nav, {
    this.deeplinks.route({
    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      this.deepUrl = match.$link.url;

      this.link = match.$link.path;

      this.linkArgs = match.$args;

      console.log(match);
      console.log(match.$args);
      console.log('Successfully matched route', match);
      //if (this.rootPage != undefined) this.naviagateDeeplink();
    }, nomatch => {
      // nomatch.$link - the full link data
      this.deepUrl = nomatch.$link.url;
      //if (this.rootPage != undefined) this.naviagateDeeplink();
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
  }

  naviagateDeeplink(value: any) {
    console.log("init deepurl")
    console.log(this.deepUrl)
    if (this.deepUrl.indexOf('/shop') != -1 && value != "openCategoryInShop") {
      this.nav.push("ProductsPage");
      console.log("navigate to Shop");
    }
    if (this.link == "/shop/" && value != "openCategoryInShop") {
      console.log("navigate to Shop with sorting");
    }
    if (this.link == "/product/" && value != "openCategoryInShop") {
      console.log("navigate to product detail");
    }

    if (this.deepUrl.indexOf('product=') != -1 && value != "openCategoryInShop") {
      let linkk = this.deepUrl;
      let arr = linkk.split("=");
      let slug = "";
      for (let val of arr) {
        if (val.indexOf('product') == -1)
          slug = val;

      }
      this.getSingleProductDetail(slug);
      console.log("navigate to product detail with = Slug");
    }

    if (this.deepUrl.indexOf('/product/') != -1 && value != "openCategoryInShop") {
      let arr = this.deepUrl.split("/");
      let count = 0;
      for (let val of arr) {
        count++;
        if (val == "product") { break; }
      }
      let slug = arr[count];

      this.getSingleProductDetail(slug);
      console.log("navigate to product detail with / Slug :" + slug);
    }

    if (this.deepUrl.indexOf('/product-category/') != -1) {
      //'http://vc.com/product-category/watches/gold-watches/ooo'
      let arr = this.deepUrl.split("/");
      let count = 0;
      let arr2 = [];
      for (let val of arr) {
        if (count == 1 && val != "") arr2.push(val);
        if (val == "product-category") count = 1;

      }
      let slug = arr2[(arr2.length) - 1];


      console.log(slug);
      console.log("navigate to shop page with category . Slug :" + slug);
      console.log(value);
      if (value == "openCategoryInShop") {
        for (let val of this.shared.allCategories) {
          console.log(val);
          if (val.slug == slug) {
            console.log("id matched : " + val.id);
            console.log(val);
            this.nav.push("ProductsPage", { id: val.id, name: "", sortOrder: 'newest' });
          }
        }
      }
    }


  }


  getSingleProductDetail(slug) {
    this.loading.show();
    this.config.Woocommerce.getAsync("products/" + "?" + this.config.productsArguments + "&slug=" + slug).then((data) => {
      this.loading.hide();
      this.nav.push("ProductDetailPage", { data: JSON.parse(data.body)[0] });
    }, err => {
      this.loading.hide();
      console.log(err);
    });
  }

  checkAvatar() {
    return this.shared.checkAvatar();
  }
  getNameFirstLetter() {
    return this.shared.getNameFirstLetter();
  }
}
