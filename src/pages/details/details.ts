import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OpendataRecordTaxiModel} from '../../models/taxi/opendata-record-taxi.model';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

  public taxi: OpendataRecordTaxiModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    
    this.taxi = this.navParams.get('taxi');
  }
}
