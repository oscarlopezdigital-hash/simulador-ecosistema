import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcosystemService } from '../../services/ecosystem';
import { Species } from '../../models/species.model';

@Component({
  selector: 'app-species-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './species-form.html',
  styleUrls: ['./species-form.css']
})
export class SpeciesFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ecosystemService = inject(EcosystemService);

  // Variables de estado para la edición
  isEditing = false;
  currentId: number | null = null;

  // Definición formulario
  speciesForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    type: ['Herbívoro', Validators.required],
    population: [0, [Validators.required, Validators.min(0)]],
    reproductionRate: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
  });

  ngOnInit(): void {
    this.ecosystemService.getEditSpecies().subscribe(species => {
      if (species) {
        this.isEditing = true;
        this.currentId = species.id;

        // Cargamos los datos en los inputs
        this.speciesForm.patchValue({
          name: species.name,
          type: species.type,
          population: species.population,
          reproductionRate: species.reproductionRate
        });
      }
    });
  }

  onSubmit(): void {
    if (this.speciesForm.valid) {
      const formData = this.speciesForm.value;
      const status = this.calculateStatus(formData.population);

      if (this.isEditing && this.currentId) {
        const updatedSpecies: Species = {
          ...formData,
          id: this.currentId,
          conservationStatus: status
        };
        this.ecosystemService.updateSpecies(updatedSpecies);
      } else {
        //Modo creaccion
        const newSpecies: Species = {
          ...formData,
          id: 0,
          conservationStatus: status
        };
        this.ecosystemService.addSpecie(newSpecies);
      }

      this.onCancel(); 
    }
  }

  onCancel(): void {
    this.isEditing = false;
    this.currentId = null;
    this.speciesForm.reset({ type: 'Herbívoro', population: 0, reproductionRate: 0 });
    this.ecosystemService.clearEdit(); // Avisamos al servicio que ya no editamos
  }

  private calculateStatus(pop: number): string {
    if (pop < 25) return 'Crítico'; // Ajustado a la lógica de tu compañero
    if (pop < 100) return 'Media';
    return 'Saludable';
  }
}
