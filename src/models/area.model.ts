import {AreaNameTranslationModel} from './area-name-translation.model';
import _ from "lodash";

export class AreaModel {
  public translation: Array<AreaNameTranslationModel>;
  public code: string;
  public name?: string;

  static fromObject = function (data: object) {

    var obj = new AreaModel();
    obj.code = data['code'];
    obj.name = data['name'];
    obj.translation = [];

    if (!_.isUndefined(data['translation'])) {
      data['translation'].forEach(function (n) {
        obj.translation.push(AreaNameTranslationModel.fromObject(n));
      });
    }


    return obj;
  }
}