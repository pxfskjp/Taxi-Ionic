import {AreaModel} from '../area.model';
import {CarModel} from '../car.model';
import {TaxiLicenseModel} from './taxi-license.model';
import {TaxiDriverModel} from './taxi-driver.model';
import _ from 'lodash';

export class TaxiModel {

  public id: string;
  public operatorId: string;
  public area: AreaModel;
  public car: CarModel;
  public license: TaxiLicenseModel;
  public drivers: Array<TaxiDriverModel>;

  static fromObject = function (data: object) {

    var obj = new TaxiModel();

    for (var i in data) {
      obj[i] = data[i];
    }
    
    obj.area = AreaModel.fromObject(data['area']);
    obj.car = CarModel.fromObject(data['car']);
    obj.license = TaxiLicenseModel.fromObject(data['license']);
    obj.drivers = [];
    
    if (!_.isEmpty(data['drivers'])){
      
      data['drivers'].forEach(function(driver){
        obj.drivers.push(TaxiDriverModel.fromObject(driver));
      })
    }

    return obj;
  }
}
