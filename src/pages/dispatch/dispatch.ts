import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ConfigService} from '../../providers/config-service/config-service';
import {ConfigModel} from '../../models/config/config.model';
import {LanguagePage} from '../language/language';
import {AreaPage} from '../area/area';
import {TabsPage} from '../tabs/tabs';
import _ from "lodash";

@Component({
  selector: 'page-dispatch',
  templateUrl: 'dispatch.html',
})
export class DispatchPage {

  public configModel: ConfigModel;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: ConfigService) {

  }

  ionViewWillEnter() {

    return this.configService.getAll().then((configModel: ConfigModel) => {

      if (_.isNull(configModel)) {
        //no config model at all, lets start with language selection
        this.navCtrl.setRoot(LanguagePage);
      } else if (_.isUndefined(configModel.selectedLanguage) || _.isEmpty(configModel.selectedLanguage)) {
        //config model exists, but no language has been previously selected, lets do it now
        this.navCtrl.setRoot(LanguagePage);
      } else if (_.isUndefined(configModel.selectedArea) || _.isEmpty(configModel.selectedArea)) {
        //language has already been selected last time, but no default area, lets select one now
        this.configService.setSessionData(configModel);
        this.navCtrl.setRoot(AreaPage);
      } else {
        //both language and area are provided, go to the main screen
        this.configService.setSessionData(configModel);
        this.navCtrl.setRoot(TabsPage);
      }





    });

  }

}
