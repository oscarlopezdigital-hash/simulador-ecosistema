

export type SpeciesType = 'Herbívoro' | 'Carnívoro' | 'Planta';
export type ConservationStatus = 'Saludable' | 'Media' | 'Crítico';

export interface Species {
  id: number;
  name: string;
  type: SpeciesType;
  population: number;
  reproductionRate: number; // Porcentaje 0-100
  conservationStatus?: ConservationStatus;
}
