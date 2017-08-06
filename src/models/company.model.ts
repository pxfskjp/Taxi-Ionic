export class CompanyModel {

  public id: string;
  public name: string;
  public eik: string;

  static fromObject = function (data: object) {

    var obj = new CompanyModel();

    for (var i in data) {
      obj[i] = data[i];
    }

    return obj;
  }
}