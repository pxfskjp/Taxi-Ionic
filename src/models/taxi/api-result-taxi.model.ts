import {TaxiModel} from './taxi.model';
import {CompanyModel} from '../company.model';
import _ from 'lodash';

export class ApiResultTaxiModel {

  public items: Array<TaxiModel>;
  public companies: Array<CompanyModel>;

  static fromObject = function (data: object) {

    var obj = new ApiResultTaxiModel();
    obj.items = [];
    obj.companies = [];

    if (!_.isUndefined(data)) {
      data['items'].forEach(function (taxi) {
        obj.items.push(TaxiModel.fromObject(taxi));
      });

      data['companies'].forEach(function (company) {
        obj.companies.push(CompanyModel.fromObject(company));
      });
    }

    return obj;
  }
}
