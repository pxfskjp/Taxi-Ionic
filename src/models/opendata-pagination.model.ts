export class OpendataPaginationModel {
  public next: string;
  public start: string;

  static fromObject = function (data: object) {

    var obj = new OpendataPaginationModel();

    for (var i in data) {
      obj[i] = data[i];
    }

    return obj;
  }

}
