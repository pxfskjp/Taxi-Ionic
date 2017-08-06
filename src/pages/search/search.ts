import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import {TaxiService} from '../../providers/taxi-service/taxi-service';
import {ConfigService} from '../../providers/config-service/config-service';
import {ConfigModel} from '../../models/config/config.model';
import {ApiResponseTaxiModel} from '../../models/taxi/api-response-taxi.model';
import {ResultsPage} from '../results/results';
import {AreaPage} from '../area/area';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private formData: FormGroup;
  public response: ApiResponseTaxiModel;
  public configModel: ConfigModel;


  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public taxiService: TaxiService,
    public configService: ConfigService) {

    //search form setup
    this.formData = this.formBuilder.group({
      q: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ionViewDidEnter() {
    this.clearData();

    this.getConfigModelData();
  }

  getConfigModelData() {
    this.configService.getAll().then(data => {
      this.configModel = data;
    })
  }

  /**
   * Handle form submittion
   */
  process() {
    this.taxiService
      .search(this.configModel.selectedArea, this.formData.get('q').value)
      .subscribe((data: ApiResponseTaxiModel) => this.showResults(data));
  }

  /**
   * Clear the form data
   */
  clearData() {
    this.formData.reset();
    delete this.response;
  }

  /**
   * Redirect to the details page, when a result is selected
   */
  showResults(response: ApiResponseTaxiModel) {

    this.response = response;

    if (response.totalItems > 0) {
      return this.navCtrl.push(ResultsPage, {items: response.result});
    }
  }

  changeArea() {
    let areaModal = this.modalCtrl.create(AreaPage, {isModal: true}, {
      cssClass: 'area-modal',
      enableBackdropDismiss: false
    });
    
   areaModal.onDidDismiss(data => {
     this.configModel = data;
   });    
    
    areaModal.present();
  }
}
