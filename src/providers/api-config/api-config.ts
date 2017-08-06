import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ConfigService} from '../config-service/config-service';
import {AreasModel} from '../../models/areas.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiConfig {

  private baseUrl: string = 'https://api.taxicheck.bg/v1';
  private resourceUri: string = '/config';

  private headers: Headers;

  constructor(
    public configService: ConfigService,
    public http: Http) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getApiConfig() {

    return this.http
      .get(this.getBaseUrl() + this.resourceUri, this.headers)
      .map(res => AreasModel.fromObject(res.json()))
      .map((res: AreasModel) => {
        return res;
      });
  }



}
