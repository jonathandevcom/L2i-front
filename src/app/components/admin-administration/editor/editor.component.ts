import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EditorService } from '../../../services/editor.service';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  editors!: any[]; // Tableau d'auteurs
  selectedEditor: any = {}; // Auteur sélectionné initialisé avec un objet vide
  selectedEditorCheck: boolean = false;
  editorForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private editorService: EditorService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getEditors();

    this.editorForm = this.formBuilder.group({
      id: [''], // Ajouter les autres champs ici avec leurs validations
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.editorForm.invalid) {
      return;
    }
  }
  getEditors(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    this.editorService.getAllEditor(id).subscribe({
      next: (response: any) => {
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
        this.editors = response.result;
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
        this.getEditors();
        setTimeout(function() {
          alertElement.style.display = 'none';
        }, 3000);
      }
    }
  }

  postEditor() {
    if (this.editorForm.invalid) {
      return;
    }
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    const formValues = this.editorForm.value;
    const editorData = {
      name: formValues.name,
      idAdmin: id
    };
    this.editorService.postEditor(JSON.stringify(editorData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
        this.submitted = false;
        this.editorForm.patchValue({
          id: "",
          name: ""
        });

      },
      error: (error) => console.log(error),
    });
  }

  updateEditor() {
    if (this.editorForm.invalid) {
      return;
    }
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    const formValues = this.editorForm.value;
    const editorData = {
      id: formValues.id,
      name: formValues.name,
      idAdmin: id
    };

    this.editorService.putEditor(this.selectedEditor.ID, JSON.stringify(editorData).replace(/,/g, ';')).subscribe({
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

  deleteEditor(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    this.editorService.deleteEditor(this.selectedEditor.ID, id).subscribe({
      next:(response: any) => {
        this.handleResponse(response);
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
        this.selectedEditor = {};
        this.selectedEditorCheck = false;
        this.submitted = false;
        this.editorForm.patchValue({
          id: "",
          name: ""
        });
      },
      error: (error) => console.log(error),
    });
  }

  selectEditor(editor: any): void {
    this.selectedEditor = editor;
    this.selectedEditorCheck = true;
    this.submitted = false;

    this.editorForm.patchValue({
      id: editor.id,
      name: editor.name
    });
  }


  addEditor(): void {
    this.selectedEditor = {};
    this.selectedEditorCheck = false;
    this.submitted = false;

    this.editorForm.patchValue({
      id: "",
      name: ""
    });
  }
}
