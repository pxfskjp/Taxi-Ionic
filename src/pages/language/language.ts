import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {ConfigService} from '../../providers/config-service/config-service';
import {LanguageModel} from '../../models/config/language.model';
import {ConfigModel} from '../../models/config/config.model';

@Component({
  selector: 'page-language',
  templateUrl: 'language.html'
})
export class LanguagePage {

  public configModel: ConfigModel;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public configService: ConfigService) {

    this.configService
      .getAll()
      .then((data: ConfigModel) => {
        this.configModel = data;
      });
  }

  ionViewDidEnter() {

  }

  setLanguage(selectedLanguage: LanguageModel) {
    
    this.configModel.selectedLanguage = selectedLanguage;
    
    this.configService.save(this.configModel).then(() => {
      this.configService.setSessionData(this.configModel);
      this.viewCtrl.dismiss();
    });
    
  }

}
