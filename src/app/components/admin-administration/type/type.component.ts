import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TypeService } from '../../../services/type.service';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html'
})
export class TypeComponent implements OnInit {
  types!: any[]; // Tableau d'auteurs
  selectedType: any = {}; // Auteur sélectionné initialisé avec un objet vide
  selectedTypeCheck: boolean = false;
  typeForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private typeService: TypeService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getTypes();

    this.typeForm = this.formBuilder.group({
      id: [''],
      typeName: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.typeForm.invalid) {
      return;
    }
  }

  getTypes(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    this.typeService.getAllType(id).subscribe({
      next: (response: any) => {
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
        this.types = response.result.result;

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
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    const formValues = this.typeForm.value;

    const typeData = {
      typeName: formValues.typeName,
      idAdmin: id
    }
    this.typeService.postType(JSON.stringify(typeData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
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
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    const formValues = this.typeForm.value;
    const typeData = {
      id: formValues.id,
      typeName: formValues.typeName,
      idAdmin: id
    };

    this.typeService.putType(this.selectedType.ID, JSON.stringify(typeData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
      },
      error: (error) => console.log(error),
    });
  }

  deleteType(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    this.typeService.deleteType(this.selectedType.ID, id).subscribe({
      next:(response: any) => {
        this.handleResponse(response);
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
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

    this.typeForm.patchValue({
      id: type.id,
      typeName: type.typeName
    });
  }


  addType(): void {
    this.selectedType = {};
    this.selectedTypeCheck = false;
    this.submitted = false;

    this.typeForm.patchValue({
      id: "",
      typeName: ""
    });
  }
}

