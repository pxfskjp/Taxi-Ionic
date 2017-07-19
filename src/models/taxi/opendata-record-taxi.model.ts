import {OpendataRecordModel} from '../opendata-record.model';

export class OpendataRecordTaxiModel extends OpendataRecordModel {

  public DataValid: string;
  public EIK: string;
  public Marka: string;
  public Model: string;
  public PorN: string;
  public PravnaForma: string;
  public Prevozvach: string;
  public RazrData: string;
  public RazrNom: string;
  public RegN: string;
  public Statis: string;
  public Udost: string;
  public VodachIme: string;

  static fromObject = function (data: object) {

    var obj = new OpendataRecordTaxiModel();

    for (var i in data) {
      obj[i] = data[i];
    }

    return obj;
  }
}
