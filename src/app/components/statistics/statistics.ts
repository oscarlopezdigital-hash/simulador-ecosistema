import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { EcosystemService } from '../../services/ecosystem';
import { Species } from '../../models/species.model';

@Component({
  selector: 'app-statistics',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css']
})
export class StatisticsComponent implements OnInit {
  totalSpecies = 0;
  totalPopulation = 0;
  countByType: { [key: string]: number } = {};

  constructor(private ecosystemService: EcosystemService) { }

  ngOnInit(): void {
    this.ecosystemService.getSpecies().subscribe(list => {
      this.totalSpecies = list.length;
      this.totalPopulation = list.reduce((sum, s) => sum + s.population, 0);

      this.countByType = list.reduce((acc, s) => {
        acc[s.type] = (acc[s.type] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });
    });
  }
}
