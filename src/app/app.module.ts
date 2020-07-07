import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { HttpModule, Http } from "@angular/http";
import { MyApp } from "./app.component";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ConfigProvider } from "../providers/config/config";
import { createTranslateLoader } from "../providers/translate/translate";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { IonicStorageModule } from "@ionic/storage";
import { LoadingProvider } from "../providers/loading/loading";
import { SharedDataProvider } from "../providers/shared-data/shared-data";
import { AlertProvider } from "../providers/alert/alert";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Stripe } from "@ionic-native/stripe";
import { CouponProvider } from "../providers/coupon/coupon";
import { PayPal } from "@ionic-native/paypal";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Push } from "@ionic-native/push";
import { Device } from "@ionic-native/device";
import { Facebook } from "@ionic-native/facebook";
import { GooglePlus } from "@ionic-native/google-plus";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Network } from "@ionic-native/network";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { AdMobFree } from "@ionic-native/admob-free";
import { FCM } from "@ionic-native/fcm";
import { AppVersion } from "@ionic-native/app-version";
import { OneSignal } from "@ionic-native/onesignal";
import { LocationDataProvider } from "../providers/location-data/location-data";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";
import { ThemeableBrowser } from "@ionic-native/themeable-browser";
import { IonicImageViewerModule } from "ionic-img-viewer";
import { EmailComposer } from "@ionic-native/email-composer";
import { Geofence } from "@ionic-native/geofence";
import { Deeplinks } from "@ionic-native/deeplinks";
import { Geolocation } from "@ionic-native/geolocation";
import { UserAddressProvider } from "../providers/user-address/user-address";
import {
  NativeGeocoder,
} from "@ionic-native/native-geocoder";
@NgModule({
  declarations: [
    MyApp,
    ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: "",
      iconMode: "md",
      mode: "md"
    }),
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    IonicImageViewerModule, // <!-- 2.0 updates start -->
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    /* DecimalPipe,
    CurencyPipe, */
    ConfigProvider,
    StatusBar,
    SplashScreen,
    SocialSharing,
    ConfigProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoadingProvider,
    SharedDataProvider,
    Stripe,
    AlertProvider,
    CouponProvider,
    PayPal,
    Push,
    Device,
    Facebook,
    GooglePlus,
    LocalNotifications,
    InAppBrowser,
    Network,
    AdMobFree,
    FCM,
    EmailComposer,
    AppVersion,
    OneSignal,
    LocationDataProvider,
    SpinnerDialog,
    ThemeableBrowser,
    Geofence,
    Deeplinks,
    Geolocation,
    UserAddressProvider,
    NativeGeocoder,
    Push
  ]
})
export class AppModule {}
