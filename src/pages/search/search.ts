import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {OpendataService} from '../../providers/opendata-service/opendata-service';
import {OpendataResponseTaxiModel} from '../../models/taxi/opendata-response-taxi.model';
import {ResultsPage} from '../results/results';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private formData: FormGroup;
  public results: OpendataResponseTaxiModel;
  public hasResults: boolean

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public opendataService: OpendataService, ) {

    //search form setup
    this.formData = this.formBuilder.group({
      q: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ionViewWillEnter() {
    this.clearData();
  }

  /**
   * Handle form submittion
   */
  process() {
    this.opendataService
      .search(this.formData.get('q').value)
      .subscribe((data: OpendataResponseTaxiModel) => this.showResults(data));
  }

  /**
   * Clear the form data
   */
  clearData() {
    this.formData.reset();
    delete this.results;
  }
  
  /**
   * Redirect to the details page, when a result is selected
   */
  showResults(items: OpendataResponseTaxiModel) {
    
    if (items.result.records.length > 0){
      return this.navCtrl.push(ResultsPage, {items: items});
    }
    
    this.results = items;
    
  }  
}
