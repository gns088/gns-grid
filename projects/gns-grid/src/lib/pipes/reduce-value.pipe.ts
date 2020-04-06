import { Pipe, PipeTransform } from '@angular/core';
import { GridUtils } from '../utils';

@Pipe({
  name: 'reduceValue'
})
export class ReduceValuePipe implements PipeTransform {

  transform(value: any, id: string): any {
    return GridUtils.resolveFieldData(value, id);
  }

}
