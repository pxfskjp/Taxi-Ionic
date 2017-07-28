import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import moment from "moment";
import _ from "lodash";
import {ConfigModel} from '../../models/config/config.model';

@Injectable()
export class ConfigService {

  constructor(
    public storage: Storage,
    public translate: TranslateService) {
  }

  getAll(): Promise<any> {
    return this.storage.ready().then(() => {
      return this.storage.get('cfg')
        .then(data => {return data});
    });
  }

  save(cfg: ConfigModel): Promise<any> {
    return this.storage.set('cfg', cfg);
  }

  loadDefaultData(): Promise<any> {
    return this.storage.set('cfg', {
      selectedLanguage: {},
      availableLanguages: [{
        code: 'bg',
        name: 'Български'
      }, {
        code: 'en',
        name: 'English'
      }]
    });
  }

  setSessionData(config: ConfigModel) {

    this.translate.setDefaultLang(config.selectedLanguage.code);
    this.translate.currentLang = config.selectedLanguage.code;

    moment.locale(config.selectedLanguage.code);
    moment.updateLocale(config.selectedLanguage.code, {
      months: moment.months().map(_.capitalize)
    });


  }
}
