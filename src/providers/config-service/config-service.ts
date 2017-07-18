import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ConfigService {

  constructor(public storage: Storage) {

  }

  getAll() {
    return this.storage.get('cfg')
      .then(data => {return data});
  }

  save(cfg: any) {
    return this.storage.set('cfg', cfg);
  }

}
