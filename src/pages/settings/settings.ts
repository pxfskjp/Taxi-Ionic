import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
//import {AppVersion} from '@ionic-native/app-version';
import {ConfigService} from '../../providers/config-service/config-service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public languagesList: any[];
  public lang: any;
  public config: object;

  public appName: any;
  public packageName: any;
  public versionCode: any;
  public versionNumber: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public configService: ConfigService,
    //public appVersion: AppVersion,
    public translate: TranslateService) {

    this.config = {};
  }

  saveLanguage() {
    this.configService.save(this.config).then((result) => this.translate.use(result.lang));
  }

  ionViewDidEnter() {

    this.configService.getAll().then(data => {
      this.config = data;
    });

    this.languagesList = [{
      code: 'bg',
      name: 'Български'
    }, {
      code: 'en',
      name: 'English'
    }];

//    this.appVersion.getAppName().then(data => this.appName = data);
//    this.appVersion.getPackageName().then(data => this.packageName = data);
//    this.appVersion.getVersionCode().then(data => this.versionCode = data);
//    this.appVersion.getVersionNumber().then(data => this.versionNumber = data);
  }
}
