export class CarModel {

  public make: string;
  public model: string;
  public plate: string;

  static fromObject = function (data: object) {

    var obj = new CarModel();

    for (var i in data) {
      obj[i] = data[i];
    }

    return obj;
  }
}