import { ComponentsModule } from './../../../components/components.module';
import { Categories6Page } from './categories6';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
export function setTranslateLoader(http: Http) {
return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    Categories6Page,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(Categories6Page),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [Http]
      }
    }),
  ],
})
export class Categories6PageModule {}
