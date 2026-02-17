import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conservationStatus',
  standalone: true
})
export class ConservationStatusPipe implements PipeTransform {

  transform(population: number): string {
    if (population < 50) return 'red';
    if (population < 150) return 'orange';
    return 'green';
  }
  }

