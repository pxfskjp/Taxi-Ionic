import {OpendataFieldsModel} from './opendata-fields.model';
import {OpendataPaginationModel} from './opendata-pagination.model';
import {OpendataRecordModel} from './opendata-record.model';

export class OpendataResultModel {
  public fields: Array<OpendataFieldsModel>;
  public q: string;
  public records: Array<OpendataRecordModel>;
  public resource_id: string;
  public total: number;
  public _links: OpendataPaginationModel;

  static fromObject = function (data: object) {

    var obj = new OpendataResultModel();

    for (var i in data) {
      obj[i] = data[i];
    }

    obj['fields'] = [];

    data['fields'].forEach(function (f) {
      obj.fields.push(OpendataFieldsModel.fromObject(f));
    });

    obj._links = OpendataPaginationModel.fromObject(data['_links']);

    return obj;
  }
}
