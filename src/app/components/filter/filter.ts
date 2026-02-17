import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcosystemService } from '../../services/ecosystem';

@Component({
  selector: 'app-species-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.html',
  styleUrls: ['./filter.css'] 
})
export class SpeciesFilterComponent {
  private ecosystemService = inject(EcosystemService);

  onFilter(event: any): void {
    const type = event.target.value;
    this.ecosystemService.applyFilters(type, undefined);
  }

  onSearch(event: any): void {
    const query = event.target.value;
    this.ecosystemService.applyFilters(undefined, query);
  }
}
