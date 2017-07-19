import {OpendataResultTaxiModel} from './opendata-result-taxi.model';

export class OpendataResponseTaxiModel {
  public help: string;
  public result: OpendataResultTaxiModel;
  public success: boolean;

  static fromObject = function (data: object) {

    var obj = new OpendataResponseTaxiModel();

    for(var i in data){
        obj[i] = data[i];
    }

    obj.result = OpendataResultTaxiModel.fromObject(data['result']);

    return obj;
  }

}
