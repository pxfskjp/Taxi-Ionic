import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {ConfigService} from '../../providers/config-service/config-service';
import {ApiConfig} from '../../providers/api-config/api-config';
import {LanguageModel} from '../../models/config/language.model';
import {ConfigModel} from '../../models/config/config.model';
import {AreaPage} from '../area/area';
import _ from 'lodash';

@Component({
  selector: 'page-language',
  templateUrl: 'language.html'
})
export class LanguagePage {

  public defaultConfig: object;
  public configModel: ConfigModel;
  public apiConfigData: object;

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
      this.defaultConfig = this.configService.loadDefaultData();

      if (!_.isNull(this.configModel)) {
        //it's open as a page, not as modal
        if (_.isEmpty(this.navParams.data)) {
          this.setLanguage(configModel.selectedLanguage);
        }
        return true;
      } else {
        this.configModel = new ConfigModel();
        return true;
      }
    });
  }

  setLanguage(selectedLanguage: LanguageModel) {

    //this.configModel = new ConfigModel();
    this.configModel.selectedLanguage = selectedLanguage;

    this.configService.save(this.configModel).then(() => {
      this.configService.setSessionData(this.configModel);

      if (_.isEmpty(this.navParams.data)) {
        //app initial screen
        this.navCtrl.setRoot(AreaPage);
      } else {
        this.viewCtrl.dismiss(this.configModel);
      }

    });

  }

}
