import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {OpendataRecordTaxiModel} from '../../models/taxi/opendata-record-taxi.model';
import {ConfigService} from '../../providers/config-service/config-service';
import {translitbg} from 'translitbg';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  public taxi: OpendataRecordTaxiModel;

  constructor(
    public navParams: NavParams,
    public configService: ConfigService) {
    this.taxi = this.navParams.get('taxi');

    this.configService
    .getAll()
    .then(cfg => {
      if(cfg.lang === 'en'){

        let tr = translitbg.create();
        
        this.taxi.VodachIme = tr.in(this.taxi.VodachIme).go();
        this.taxi.Marka = tr.in(this.taxi.Marka).go();
        this.taxi.Model = tr.in(this.taxi.Model).go();
        this.taxi.Prevozvach = tr.in(this.taxi.Prevozvach).go();        
      }
    });
    
  }
}
