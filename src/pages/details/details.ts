import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConfigService} from '../../providers/config-service/config-service';
import {translitbg} from 'translitbg';
import {TranslateService} from '@ngx-translate/core';
import {TaxiModel} from '../../models/taxi/taxi.model';
import {TaxiDriverModel} from '../../models/taxi/taxi-driver.model';
import {CompanyModel} from '../../models/company.model';
import _ from 'lodash';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  public taxi: TaxiModel;
  public company: CompanyModel;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public configService: ConfigService,
    public translateService: TranslateService) {

    this.taxi = this.navParams.get('taxi');
    this.company = this.navParams.get('company');
  }

  ionViewDidEnter() {

    if (this.translateService.currentLang !== 'bg') {

      let tr = translitbg.create();

      this.taxi.drivers.forEach(function (d: TaxiDriverModel) {
        d.names = tr.in(d.names).go();
      });

      this.taxi.car.make = tr.in(this.taxi.car.make).go();
      this.taxi.car.model = tr.in(this.taxi.car.model).go();

      if (!_.isUndefined(this.company)) {
        this.company.name = tr.in(this.company.name).go();
      }
    }
  }
}
