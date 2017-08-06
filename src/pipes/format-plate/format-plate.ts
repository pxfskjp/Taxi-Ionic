import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform a car plate in human readable format. 
 * 
 * Example: "CA5868BP" into "CA 5868 BP"
 */
@Pipe({
  name: 'formatPlate',
})
export class FormatPlatePipe implements PipeTransform {
  transform(value: string, ...args) {
    return value.replace(/\d{4,}/, " $& ");
  }
}
