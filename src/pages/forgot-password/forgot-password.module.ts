import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotPasswordPage } from './forgot-password';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
export function setTranslateLoader(http: Http) {
return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    ForgotPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotPasswordPage),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (setTranslateLoader),
        deps: [Http]
      }
    }),
  ],
})
export class ForgotPasswordPageModule {}