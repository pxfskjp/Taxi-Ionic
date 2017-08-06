import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OpendataRecordTaxiModel} from '../../models/taxi/opendata-record-taxi.model';
import {ConfigService} from '../../providers/config-service/config-service';
import {translitbg} from 'translitbg';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  public taxi: OpendataRecordTaxiModel;
  public bk: OpendataRecordTaxiModel;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public configService: ConfigService,
    public translateService: TranslateService) {
    
    this.taxi = this.navParams.get('taxi');
  }

  ionViewDidEnter() {

    if (this.translateService.currentLang !== 'bg') {

      let tr = translitbg.create();

      this.taxi.VodachIme = tr.in(this.taxi.VodachIme).go();
      this.taxi.Marka = tr.in(this.taxi.Marka).go();
      this.taxi.Model = tr.in(this.taxi.Model).go();
      this.taxi.Prevozvach = tr.in(this.taxi.Prevozvach).go();
    }
  }
}
