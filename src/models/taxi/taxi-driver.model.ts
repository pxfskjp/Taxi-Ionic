import {TaxiDriverCertificateModel} from './taxi-driver-certificate.model';

export class TaxiDriverModel {

  public names: string;
  public certificate: TaxiDriverCertificateModel;

  static fromObject = function (data: object) {

    var obj = new TaxiDriverModel();
    obj.names = data['names'];

    obj.certificate = TaxiDriverCertificateModel.fromObject(data['certificate']);

    return obj;
  }

}
