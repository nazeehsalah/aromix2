import { IonicPage } from "ionic-angular";
// Project Name: IonicEcommerce
// Project URI: http://ionicecommerce.com
// Author: VectorCoder Team
// Author URI: http://vectorcoder.com/
import { Component, ViewChild, ApplicationRef } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { ConfigProvider } from "../../../providers/config/config";
import { TranslateService } from "@ngx-translate/core";
import { SharedDataProvider } from "../../../providers/shared-data/shared-data";
import { trigger, style, animate, transition } from "@angular/animations";
import { NavController, Content, Events, InfiniteScroll } from "ionic-angular";
@IonicPage()
@Component({
  selector: "page-home7",
  animations: [
    trigger("animate", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms", style({ opacity: 1 })),
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("700ms", style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: "home7.html",
})
export class Home7Page {
  @ViewChild(Content) content: Content;
  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;
  products: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  selected = "";
  page = 1;
  count = 0;
  loadingServerData = false;
  notiCount;
  segments: any = "topSeller";

  segments2 = "aboutUs";
  constructor(
    public http: Http,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    public events: Events,
    private applicationRef: ApplicationRef,
    public translateService: TranslateService
  ) {
    this.translateService.setDefaultLang(localStorage.languageCode);
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
    this.events.publish("footerChange", "HomePage");
  }

  scrollTopButton = false;
  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }

  onScroll(e) {
    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;
    //else this.scrollTopButton=false;
    //   console.log(e);
  }
  getProducts(infiniteScroll) {
    if (this.loadingServerData) return 0;
    if (this.page == 1) {
      this.count++;
      this.loadingServerData = false;
    }
    this.loadingServerData = true;
    let query = "products?" + "page=" + this.page;
    if (this.selected != "") query = "products?page=" + this.page;
    query = query + "&status=publish" + "&" + this.config.productsArguments;
    this.config.Woocommerce.getAsync(query).then((data) => {
      let dat = JSON.parse(data.body);
      this.infinite.complete();
      if (this.page == 1) {
        this.products = new Array();
      }
      if (dat.length != 0) {
        this.page++;
        for (let value of dat) {
          this.products.push(value);
        }
      }
      if (dat.length == 0) {
        this.infinite.enable(false);
      }
      this.loadingServerData = false;
      this.applicationRef.tick();
    });
  }

  ngOnInit() {
    this.getProducts(null);
  }
  makeNotiCountByZero() {
    this.shared.setNotiCountByZero();
    this.navCtrl.push("NotificationPage");
    /*   this.shared.setNotiCountByZero();
    this.shared.getNotiCount().then((res) => {
      this.notiCount = res;
    }); */
  }
}
