import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController, LoadingController, Loading} from 'ionic-angular';
import {ConfigService} from '../../providers/config-service/config-service';
import {ApiConfig} from '../../providers/api-config/api-config';
import {AreaModel} from '../../models/area.model';
import {AreasModel} from '../../models/areas.model';
import {ConfigModel} from '../../models/config/config.model';
import {TabsPage} from '../tabs/tabs';
import _ from 'lodash';

@Component({
  selector: 'page-area',
  templateUrl: 'area.html'
})
export class AreaPage {

  public defaultConfig: object;
  public configModel: ConfigModel;
  public apiConfigData: object;
  public selectedArea: any;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public configService: ConfigService,
    public apiConfig: ApiConfig) {
  }

  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  ionViewCanEnter() {

    this.presentLoadingDefault();

    return this.configService.getAll().then((configModel: ConfigModel) => {

      this.loading.dismiss();

      this.configModel = configModel;

      if (!_.isEmpty(this.configModel.selectedArea) && _.isEmpty(this.navParams.data)) {
        this.navCtrl.setRoot(TabsPage);
      }

      return true;

    });
  }

  ionViewDidEnter() {
    return this.apiConfig
      .getApiConfig()
      .subscribe((areasModel: AreasModel) => {

        this.configModel.areas = _.sortBy(areasModel.areas, (areaModel: AreaModel) => {
          return _.find(areaModel.translation, {lang: this.configModel.selectedLanguage.code}).name;
        });

        this.configService.save(this.configModel);
      });
  }

  setArea(selectedArea: AreaModel) {

    //this.configModel = new ConfigModel();
    this.configModel.selectedArea = selectedArea;


    this.configService.save(this.configModel).then(() => {
      this.configService.setSessionData(this.configModel);

      if (_.isEmpty(this.navParams.data)) {
        //app initial screen
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.viewCtrl.dismiss(this.configModel);
      }

    });

  }

}
