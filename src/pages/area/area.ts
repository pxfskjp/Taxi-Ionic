import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public configService: ConfigService,
    public apiConfig: ApiConfig) {
  }

  ionViewCanEnter() {
    return this.configService.getAll().then((configModel: ConfigModel) => {
      this.configModel = configModel;

      if (!_.isEmpty(this.configModel.selectedArea) && _.isEmpty(this.navParams.data)) {
        this.navCtrl.setRoot(TabsPage);
        return true;
      }

    });
  }

  ionViewWillEnter() {
    return this.apiConfig
      .getApiConfig()
      .subscribe((areasModel: AreasModel) => {
        this.configModel.areas = areasModel.areas;
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
