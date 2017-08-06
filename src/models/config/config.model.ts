import {LanguageModel} from './language.model';
import {AreaModel} from '../area.model';

export class ConfigModel {
  public selectedLanguage: LanguageModel;
  public availableLanguages: Array<LanguageModel>;
  public areas: Array<AreaModel>;
  public selectedArea: AreaModel;
}
