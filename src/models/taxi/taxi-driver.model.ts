import {TaxiDriverCertificateModel} from './taxi-driver-certificate.model';

export class TaxiDriverModel {

  public name: string;
  public certificate: TaxiDriverCertificateModel;

  static fromObject = function (data: object) {

    var obj = new TaxiDriverModel();
    obj.name = data['name'];

    obj.certificate = TaxiDriverCertificateModel.fromObject(data['area']);

    return obj;
  }

}
