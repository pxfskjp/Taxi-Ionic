import {AreaNameTranslationModel} from './area-name-translation.model';

export class AreaModel {
  public translation: Array<AreaNameTranslationModel>;
  public code: string;
  
  static fromObject = function (data: object) {

    var obj = new AreaModel();
    obj.code = data['code'];
    obj.translation = [];
    
    data['translation'].forEach(function(n){
      obj.translation.push(AreaNameTranslationModel.fromObject(n));
    });


    return obj;
  }  
}