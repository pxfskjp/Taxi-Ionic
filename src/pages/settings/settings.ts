import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {AppVersion} from '@ionic-native/app-version';
import {ConfigService} from '../../providers/config-service/config-service';
import {ConfigModel} from '../../models/config/config.model';
import {LanguagePage} from '../language/language';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public configModel: ConfigModel;
  public appName: any;
  public packageName: any;
  public versionCode: any;
  public versionNumber: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public configService: ConfigService,
    public appVersion: AppVersion,
    public translate: TranslateService) {
  }

  ionViewDidEnter() {

    this.configService.getAll().then((configModel: ConfigModel) => {
      this.configModel = configModel;
    });

    this.appVersion.getAppName().then(data => this.appName = data);
    this.appVersion.getPackageName().then(data => this.packageName = data);
    this.appVersion.getVersionCode().then(data => this.versionCode = data);
    this.appVersion.getVersionNumber().then(data => this.versionNumber = data);
  }

  changeLanguage() {
    let languageModal = this.modalCtrl.create(LanguagePage, null, {
      cssClass: 'language-modal'
    });
    languageModal.onDidDismiss(() => {
      this.navCtrl.setRoot(SettingsPage);
    });
    languageModal.present();
  }
}
