import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSpecies',
})
export class FilterSpeciesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
