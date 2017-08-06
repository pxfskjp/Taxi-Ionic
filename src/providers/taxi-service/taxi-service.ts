import {Injectable} from '@angular/core';
import {Http, Jsonp, Headers} from '@angular/http';
import {ConfigService} from '../config-service/config-service';
import {ApiConfig} from '../api-config/api-config';
import {AreaModel} from '../../models/area.model';
import {ApiResponseTaxiModel} from '../../models/taxi/api-response-taxi.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaxiService {

  private resourceUri: string = '/search';

  private headers: Headers;

  constructor(
    public configService: ConfigService,
    public apiConfig: ApiConfig,
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
   * @returns ApiResponseTaxiModel
   */
  search(area: AreaModel, q: string) {

    return this.http
      .request(this.apiConfig.getBaseUrl() + this.resourceUri + '?area.code=' + area.code + '&car.plate=' + q )
      .map(res => ApiResponseTaxiModel.fromObject(res.json()))
      .map(res => {
        return res;
      });
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
