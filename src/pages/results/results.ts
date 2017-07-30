import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {OpendataRecordTaxiModel} from '../../models/taxi/opendata-record-taxi.model';
import {OpendataResponseTaxiModel} from '../../models/taxi/opendata-response-taxi.model';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  public results: OpendataResponseTaxiModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.results = this.navParams.get('items');
  }

  /**
   * Redirect to the details page, when a result is selected
   */
  showDetails(item: OpendataRecordTaxiModel) {
    this.navCtrl.push(DetailsPage, {taxi: item});
  }

}
