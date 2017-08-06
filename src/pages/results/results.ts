import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {

  public results: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {

    this.results = this.navParams.get('items');
    
    console.log(this.results)
  }

  /**
   * Redirect to the details page, when a result is selected
   */
  showDetails(item: any) {
    this.navCtrl.push(DetailsPage, {taxi: item});
  }

}
