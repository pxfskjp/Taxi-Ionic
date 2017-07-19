import {OpendataResultModel} from '../opendata-result.model';
import {OpendataRecordTaxiModel} from './opendata-record-taxi.model';

export class OpendataResultTaxiModel extends OpendataResultModel {

  public records: Array<OpendataRecordTaxiModel>;

  static fromObject = function (data: object) {

    var parentObj = OpendataResultModel.fromObject(data);

    var obj = new OpendataResultTaxiModel();

    for (var i in parentObj) {
      obj[i] = parentObj[i];
    }

    obj.records = [];
    data['records'].forEach(function (r) {

      //remove expired licenses
      if (new Date(r["DataValid"]) < new Date()) {
        return;
      }

      obj.records.push(OpendataRecordTaxiModel.fromObject(r));
    });

    return obj;
  }
}
