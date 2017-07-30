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

  public defaultConfig: object;
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
      this.defaultConfig = this.configService.loadDefaultData();

      if (!_.isNull(this.configModel)) {
        //it's open as a page, not as modal
        if (_.isEmpty(this.navParams.data)) {
          this.setLanguage(configModel.selectedLanguage);
        }
        return true;
      }
    });
  }

  setLanguage(selectedLanguage: LanguageModel) {

    this.configModel = new ConfigModel();
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
