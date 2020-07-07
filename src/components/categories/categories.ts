import { Component, Input } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../providers/shared-data/shared-data';
import { ConfigProvider } from '../../providers/config/config';

/**
 * Generated class for the CategoriesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'categories',
  templateUrl: 'categories.html'
})
export class CategoriesComponent {

  @Input('type') type;


  constructor(
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    public events: Events,
    public translate: TranslateService) {
 
  }
  openSubCategories(parent) {
    let count = 0;
    for (let val of this.shared.subCategories) {
      if (val.parent == parent) count++;
      //console.log(val.parent + "   " + parent);
    }
    if (count == 0)
      this.navCtrl.push("ProductsPage", { id: parent, name: "", sortOrder: 'newest' });
    else { this.events.publish("openSubcategoryPage", parent) }

  }
}
