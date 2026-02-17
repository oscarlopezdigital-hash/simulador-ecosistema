import { Component, signal } from '@angular/core';
import { SpeciesFormComponent } from './components/species-form/species-form';
import { SpeciesListComponent } from './components/species-list/species-list';
import { SpeciesFilterComponent } from './components/filter/filter';
import { StatisticsComponent } from './components/statistics/statistics';

@Component({
  selector: 'app-root',
  imports: [SpeciesListComponent, SpeciesFormComponent, SpeciesFilterComponent, StatisticsComponent ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('simulador-ecosistema');
}
