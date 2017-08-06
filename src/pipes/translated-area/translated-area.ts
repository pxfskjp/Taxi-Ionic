import { Pipe, PipeTransform } from '@angular/core';
import {AreaModel} from '../../models/area.model';
import _ from 'lodash';

/**
 * Transform a car plate in human readable format. 
 * 
 * Example: "CA5868BP" into "CA 5868 BP"
 */
@Pipe({
  name: 'translatedArea',
})
export class TranslatedAreaPipe implements PipeTransform {
  transform(value: AreaModel, ...args) {
    return _.find(value.translation, {lang: args[0].code}).name;
  }
}
