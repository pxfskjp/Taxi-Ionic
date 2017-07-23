import {Injectable} from '@angular/core';
import {Http, Jsonp} from '@angular/http';
import {ConfigService} from '../config-service/config-service';
import {OpendataResponseTaxiModel} from '../../models/taxi/opendata-response-taxi.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import _ from 'lodash';

@Injectable()
export class OpendataService {

  private apiUrl = 'https://opendata.government.bg/api/action/datastore_search?resource_id=980aad4c-821a-40bc-8cab-586a634b757b&q=';

  private headers: Headers;

  constructor(
    public configService: ConfigService,
    public http: Http,
    public jsonp: Jsonp) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  search(q: string) {

    return this.jsonp
      .request(this.apiUrl + this.transliterate(q.toUpperCase()) + '&callback=JSONP_CALLBACK', this.headers)
      .map(res => OpendataResponseTaxiModel.fromObject(res.json()))
      .map(res => this.filterInvalid(res))
      .map(res => {
        res.result.total = res.result.records.length;
        return res;
      });
  }

  filterInvalid(res: OpendataResponseTaxiModel): OpendataResponseTaxiModel {

    if (res.result.records.length === 0) {
      return res;
    }

    _.remove(res.result.records, {Status: 'прекратено'});

    return res;
  }

  transliterate(word: string) {

    let a = {"A": "А", "B": "В", "E": "Е", "K": "К", "M": "М", "H": "Н", "O": "О", "P": "Р", "C": "С", "T": "Т", "Y": "У", "X": "Х"};

    return word.split('').map(function (char) {
      return a[char] || char;
    }).join("");
  }

}
