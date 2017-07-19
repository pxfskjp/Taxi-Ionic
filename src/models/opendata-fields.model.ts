export class OpendataFieldsModel {
  public type: string;
  public id: string;
  
  static fromObject = function (data: object) {

    var obj = new OpendataFieldsModel();

    for(var i in data){
        obj[i] = data[i];
    }

    return obj;
  }  
}