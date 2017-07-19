import {OpendataResultModel} from './opendata-result.model';

export class OpendataResponseModel {
  public help: string;
  public result: OpendataResultModel;
  public success: boolean;

  static fromObject = function (data: object) {

    var obj = new OpendataResponseModel();

    for(var i in data){
        obj[i] = data[i];
    }

    obj.result = OpendataResultModel.fromObject(data['result']);

    return obj;
  }

}
