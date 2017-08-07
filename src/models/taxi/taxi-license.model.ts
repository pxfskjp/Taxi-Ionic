export class TaxiLicenseModel {

  public code: string;
  public from: string;
  public to: string;

  static fromObject = function (data: object) {

    var obj = new TaxiLicenseModel();

    for (var i in data) {
      obj[i] = data[i];
    }

    return obj;
  }
}
