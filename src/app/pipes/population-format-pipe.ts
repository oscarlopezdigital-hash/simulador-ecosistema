import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'populationFormat',
  standalone: true 
})
export class PopulationFormatPipe implements PipeTransform {
  transform(value: number): string | number {
    if (!value) return 0;
    return value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value;
  }
}
