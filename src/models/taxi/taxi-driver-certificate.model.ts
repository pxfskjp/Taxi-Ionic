export class TaxiDriverCertificateModel {
  public code: string;
  
  static fromObject = function (data: object) {

    var obj = new TaxiDriverCertificateModel();

    for (var i in data) {
      obj[i] = data[i];
    }
   
    return obj;
  }  
}
