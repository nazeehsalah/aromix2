import { Component, ViewChild, ApplicationRef } from '@angular/core';
import { InfiniteScroll } from 'ionic-angular';
import { Http } from '@angular/http';
import { ConfigProvider } from '../../providers/config/config';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';


@Component({
  selector: 'scrolling-featured-products',
  templateUrl: 'scrolling-featured-products.html'
})
export class ScrollingFeaturedProductsComponent {

  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;
  products: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  selected = '';
  page = 1;
  count = 0;
  loadingServerData = false;

  constructor(
    private applicationRef: ApplicationRef,
    public http: Http,
    public config: ConfigProvider,
    public shared: SharedDataProvider, ) {
    console.log('ScrollingFeaturedProductsComponent Component');
  }

  getProducts(infiniteScroll) {
    if (this.loadingServerData) return 0;
    if (this.page == 1) {

      this.count++;
      this.loadingServerData = false;
    }
    this.loadingServerData = true;
    let query = 'products?' + 'page=' + this.page;
    if (this.selected != '')
      query = 'products?page=' + this.page;
    query = query + "&status=publish" + "&" + this.config.productsArguments
    this.config.Woocommerce.getAsync(query).then((data) => {

      let dat = JSON.parse(data.body);

      this.infinite.complete();
      if (this.page == 1) {
        this.products = new Array;

      }
      if (dat.length != 0) {
        this.page++;
        for (let value of dat) {
          this.products.push(value);
        }
      }
      if (dat.length == 0) { this.infinite.enable(false); }
      this.loadingServerData = false;
      this.applicationRef.tick();
    });
  }

  ngOnInit() {
    this.getProducts(null);
  }
}
