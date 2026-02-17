import { Component, inject, OnInit } from '@angular/core';
import { Species } from '../../models/species.model';
import { EcosystemService } from '../../services/ecosystem';
import { CommonModule } from '@angular/common';
import { PopulationFormatPipe } from '../../pipes/population-format-pipe';
import { ConservationStatusPipe } from '../../pipes/conservation-status-pipe';

@Component({
  selector: 'app-species-list',
  standalone: true,
  imports: [CommonModule, PopulationFormatPipe, ConservationStatusPipe],
  templateUrl: './species-list.html',
  styleUrl: './species-list.css',
})
export class SpeciesListComponent implements OnInit {
  public ecosystemService = inject(EcosystemService);
  species: Species[] = [];

  ngOnInit(): void {
    this.ecosystemService.getSpecies().subscribe(data => {
      this.species = data;
    });
  }

  onDelete(id: number): void {
    this.ecosystemService.deleteSpecies(id);
  }

  onEdit(species: Species) {

    this.ecosystemService.setEditSpecies(species);
  }

  onReproduce(id: number) {
    this.ecosystemService.reproduce(id);
  }
}
