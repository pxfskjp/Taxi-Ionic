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

    this.translate.onDefaultLangChange.subscribe(params => {

      this.translate.use(params.lang);

      moment.locale(params.lang);
      moment.updateLocale(params.lang, {
        months: moment.months().map(_.capitalize)
      });

    });

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

  loadDefaultData(): object {
    return {
      selectedLanguage: {},
      availableLanguages: [{
        code: 'bg',
        name: 'Български'
      }, {
        code: 'en',
        name: 'English'
      }]
    };
  }

  setSessionData(config: ConfigModel) {
    this.translate.setDefaultLang(config.selectedLanguage.code);
  }
}
