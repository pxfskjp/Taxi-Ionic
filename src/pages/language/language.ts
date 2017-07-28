import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import {ConfigService} from '../../providers/config-service/config-service';
import {LanguageModel} from '../../models/config/language.model';
import {ConfigModel} from '../../models/config/config.model';
import {TabsPage} from '../tabs/tabs';
import _ from 'lodash';

@Component({
  selector: 'page-language',
  templateUrl: 'language.html'
})
export class LanguagePage {

  public defaultConfig: ConfigModel;
  public configModel: ConfigModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public configService: ConfigService) {
  }

  ionViewCanEnter() {

    return this.configService.getAll().then((configModel: ConfigModel) => {

      this.configModel = configModel;

      if (_.isNull(this.configModel)) {
        //the user opens the app for the first time
        return this.configService
          .loadDefaultData()
          .then((defaultConfig: ConfigModel) => {
            this.defaultConfig = defaultConfig;
            this.configModel = defaultConfig;
            return true;
          });
      } else {
        if (_.isEmpty(this.navParams.data)) {
          this.setLanguage(configModel.selectedLanguage);
        } else {
          this.defaultConfig = this.configModel;
        }
        return true;
      }

    });
  }

  setLanguage(selectedLanguage: LanguageModel) {

    this.configModel.selectedLanguage = selectedLanguage;

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
