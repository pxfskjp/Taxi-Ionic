import {AreaModel} from './area.model';

export class AreasModel {
  
  public areas: Array<AreaModel>;
  
  static fromObject = function (data: object) {

    var obj = new AreasModel();
    obj.areas = [];

    data['areas'].forEach(function(area){
      obj.areas.push(AreaModel.fromObject(area));
    });

    return obj;
  }  
}