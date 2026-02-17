import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Species } from '../models/species.model';

@Injectable({
  providedIn: 'root'
})
export class EcosystemService {

  private initialSpecies: Species[] = [
    { id: 1, name: "Lobo Gris", type: "Carnívoro", population: 50, reproductionRate: 20, conservationStatus: "Media" },
    { id: 2, name: "Ciervo Rojo", type: "Herbívoro", population: 120, reproductionRate: 15, conservationStatus: "Saludable" },
    { id: 3, name: "Roble Común", type: "Planta", population: 200, reproductionRate: 30, conservationStatus: "Saludable" },
    { id: 4, name: "Águila Real", type: "Carnívoro", population: 15, reproductionRate: 10, conservationStatus: "Crítico" },
    { id: 5, name: "Zorro Rojo", type: "Carnívoro", population: 35, reproductionRate: 25, conservationStatus: "Media" },
    { id: 6, name: "Pino Silvestre", type: "Planta", population: 150, reproductionRate: 20, conservationStatus: "Saludable" },
    { id: 7, name: "Conejo Europeo", type: "Herbívoro", population: 80, reproductionRate: 40, conservationStatus: "Media" },
    { id: 8, name: "Ciervo Volador", type: "Herbívoro", population: 60, reproductionRate: 25, conservationStatus: "Media" },
    { id: 9, name: "Lirios del Agua", type: "Planta", population: 100, reproductionRate: 35, conservationStatus: "Saludable" },
    { id: 10, name: "Búho Común", type: "Carnívoro", population: 20, reproductionRate: 15, conservationStatus: "Crítico" }
  ];

  private currentType = 'Todos';
  private currentSearch = '';

  private speciesSubject = new BehaviorSubject<Species[]>(this.initialSpecies);
  private editSpeciesSubject = new BehaviorSubject<Species | null>(null);

  constructor(private http: HttpClient) { }

  getSpecies(): Observable<Species[]> {
    return this.speciesSubject.asObservable();
  }

  setEditSpecies(species: Species): void {
    this.editSpeciesSubject.next(species);
  }

  getEditSpecies(): Observable<Species | null> {
    return this.editSpeciesSubject.asObservable();
  }

  clearEdit(): void {
    this.editSpeciesSubject.next(null);
  }

  addSpecie(species: Species): void {
    const newSpecies = { ...species, id: Date.now() };
    this.initialSpecies = [...this.initialSpecies, newSpecies];
    this.applyFilters();
  }

  deleteSpecies(id: number): void {
    this.initialSpecies = this.initialSpecies.filter(s => s.id !== id);
    this.applyFilters();
  }

  updateSpecies(updated: Species): void {
    this.initialSpecies = this.initialSpecies.map(s => s.id === updated.id ? updated : s);
    this.clearEdit();
    this.applyFilters();
  }

  reproduce(id: number): void {
    this.initialSpecies = this.initialSpecies.map(s => {
      if (s.id === id) {
        const incremento = 1 + (s.reproductionRate / 100);
        return { ...s, population: Math.round(s.population * incremento) };
      }
      return s;
    });
    this.applyFilters();
  }

  applyFilters(type?: string, search?: string): void {
    if (type !== undefined) this.currentType = type;
    if (search !== undefined) this.currentSearch = search.toLowerCase();

    let filtered = this.initialSpecies;

    if (this.currentType !== 'Todos') {
      filtered = filtered.filter(s => s.type === this.currentType);
    }

    if (this.currentSearch) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(this.currentSearch)
      );
    }
    this.speciesSubject.next(filtered);
  }

  getImagePath(type: string): string {
    const baseUrl = 'images/';

    switch (type) {
      case 'Carnívoro': return `${baseUrl}carnivoro.jpg`;
      case 'Herbívoro': return `${baseUrl}herbivoro.jpg`;
      case 'Planta': return `${baseUrl}planta.jpg`;
      default: return `${baseUrl}default.png`;
    }
  }
}
