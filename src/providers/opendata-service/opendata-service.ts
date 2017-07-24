import {Injectable} from '@angular/core';
import {Http, Jsonp, Headers} from '@angular/http';
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

  /**
   * Search taxi api
   *
   * Using the keyword provided by the user, call the official 
   * api and search for mattching records. Pretend the keyword 
   * is a plate number.
   *
   * @returns OpendataResponseTaxiModel
   */
  search(q: string) {

    return this.jsonp
      .request(this.apiUrl + '{"RegN":"*'+this.asPlateNumber(q)+'*"}' + '&callback=JSONP_CALLBACK', this.headers)
      .map(res => OpendataResponseTaxiModel.fromObject(res.json()))
      .map(res => this.filterInvalid(res))
      .map(res => {
        res.result.total = res.result.records.length;
        return res;
      });
  }

  /**
   * Filter invalid results
   * 
   * Remove all results with Status: "прекратено"
   */
  filterInvalid(res: OpendataResponseTaxiModel): OpendataResponseTaxiModel {

    if (res.result.records.length === 0) {
      return res;
    }

    _.remove(res.result.records, {Status: 'прекратено'});

    return res;
  }

  /**
   * Cyr to Latin transliteration only for the plate number letters
   */
  transliterate(word: string): string {

    let a = {"A": "А", "B": "В", "E": "Е", "K": "К", "M": "М", "H": "Н", "O": "О", "P": "Р", "C": "С", "T": "Т", "Y": "У", "X": "Х"};

    return word.split('').map(function (char) {
      return a[char] || char;
    }).join("");
  }

  /**
   * Format as plate number
   * 
   * Use the keyword provided by the user and try to format it 
   * as plate number, e.g. "A 1234 BB" or "AA 1234 BB"
   */
  asPlateNumber(q: string): string {
    return this
      .transliterate(q.toUpperCase())
      .replace(/^(\D{1,2})(\d)/, "$1 $2")
      .replace(/(\d)(\D{1,2})$/, "$1 $2");
  }

}
