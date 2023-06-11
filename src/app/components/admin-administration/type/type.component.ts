import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TypeService } from '../../../services/type.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  types!: any[]; // Tableau d'auteurs
  selectedType: any = {}; // Auteur sélectionné initialisé avec un objet vide
  selectedTypeCheck: boolean = false;
  typeForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private typeService: TypeService
  ) { }

  ngOnInit(): void {
    this.getTypes();

    this.typeForm = this.formBuilder.group({
      id: [''],
      typeName: ['', Validators.required]
    });
  }

  onSubmit() {
    let message: string = '';
    this.submitted = true;
    if (this.typeForm.invalid) {
      return;
    }
  }
  getTypes(): void {
    this.typeService.getAllType().subscribe({
      next: (response: any) => {
        this.types = response.result;
      },
      error: (error) => console.log(error),
    });
  }

  handleResponse(response: any): void {
    let message: string = '';
    if (response.result.error) {
      message = response.result.error;
      const alertElement = document.getElementById('cart-error');
      if (alertElement) {
        alertElement.innerHTML = message;
        alertElement.style.display = 'block';
        setTimeout(function() {
          alertElement.style.display = 'none';
        }, 3000);
      }
    }

    if (response.result.success) {
      message = response.result.success;
      const alertElement = document.getElementById('cart-success');
      if (alertElement) {
        alertElement.innerHTML = message;
        alertElement.style.display = 'block';
        this.getTypes();
        setTimeout(function() {
          alertElement.style.display = 'none';
        }, 3000);
      }
    }
  }

  postType() {
    if (this.typeForm.invalid) {
      return;
    }

    const formValues = this.typeForm.value;
    const typeData = {
      typeName: formValues.typeName
    };
    this.typeService.postType(JSON.stringify(typeData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
        this.submitted = false;
        this.typeForm.patchValue({
          id: "",
          typeName: ""
        });

      },
      error: (error) => console.log(error),
    });
  }

  updateType() {
    if (this.typeForm.invalid) {
      return;
    }

    const formValues = this.typeForm.value;
    const typeData = {
      id: formValues.id,
      typeName: formValues.typeName
    };

    this.typeService.putType(this.selectedType.ID, JSON.stringify(typeData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
      },
      error: (error) => console.log(error),
    });
  }

  deleteType(): void {
    this.typeService.deleteType(this.selectedType.ID).subscribe({
      next:(response: any) => {
        this.handleResponse(response);
        this.selectedType = {};
        this.selectedTypeCheck = false;
        this.submitted = false;
        this.typeForm.patchValue({
          id: "",
          typeName: ""
        });
      },
      error: (error) => console.log(error),
    });
  }

  selectType(type: any): void {
    this.selectedType = type;
    this.selectedTypeCheck = true;
    this.submitted = false;

    // Mettre à jour les valeurs du formulaire
    this.typeForm.patchValue({
      id: type.id,
      typeName: type.typeName
    });
  }


  addType(): void {
    this.selectedType = {};
    this.selectedTypeCheck = false;
    this.submitted = false;
    // Mettre à jour les valeurs du formulaire
    this.typeForm.patchValue({
      id: "",
      typeName: ""
    });
  }
}

