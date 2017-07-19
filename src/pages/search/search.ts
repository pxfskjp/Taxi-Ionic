import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {OpendataService} from '../../providers/opendata-service/opendata-service';
import {OpendataResponseTaxiModel} from '../../models/taxi/opendata-response-taxi.model';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private formData: FormGroup;
  public results: OpendataResponseTaxiModel;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public opendataService: OpendataService, ) {

    this.formData = this.formBuilder.group({
      q: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  process() {
    this.opendataService
      .search(this.formData.get('q').value)
      .subscribe(data => this.results = data);
  }

  showDetails(item) {
    this.navCtrl.push(DetailsPage, {taxi: item});
  }
  
  clearData() {
    this.formData.reset();
    this.results = null;
  }
}
