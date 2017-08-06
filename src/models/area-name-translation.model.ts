export class AreaNameTranslationModel {
  public lang: string;
  public name: string;
  
  static fromObject = function (data: object) {

    var obj = new AreaNameTranslationModel();

    for(var i in data){
        obj[i] = data[i];
    }

    return obj;
  }  
}