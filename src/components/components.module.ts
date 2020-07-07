import { Http } from '@angular/http';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';import { CategoriesComponent } from './categories/categories';import { ScrollingFeaturedProductsComponent } from './scrolling-featured-products/scrolling-featured-products';import { VendorListComponent } from './vendor-list/vendor-list'; import { BannersComponent } from './banners/banners'; import { ProductComponent } from './product/product'; import { FooterComponent } from './footer/footer'; import { SlidingTabsComponent } from './sliding-tabs/sliding-tabs';
export function setTranslateLoader(http: Http) {
return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
    declarations: [
    VendorListComponent,
     CategoriesComponent,
     ScrollingFeaturedProductsComponent,
     BannersComponent,
     ProductComponent,
     FooterComponent,
     SlidingTabsComponent,
    ],
    imports: [
        IonicModule,TranslateModule.forChild({
            loader: {
            provide: TranslateLoader,
            useFactory: (setTranslateLoader),
            deps: [HttpClient]
            }
        })
    ],
    exports: [
        VendorListComponent,
        CategoriesComponent,
        ScrollingFeaturedProductsComponent,
        BannersComponent,
        ProductComponent,
        FooterComponent,
        SlidingTabsComponent,
    ],
    schemas: [
        
      ]
})
export class ComponentsModule { }
