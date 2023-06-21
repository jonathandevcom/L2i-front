import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthorComponent } from './author.component';
import { FormBuilder } from '@angular/forms';
import { AuthorService } from '../../../services/author.service';
import { ActivatedRoute } from '@angular/router';


describe('AuthorComponentIntegration', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'Mock value'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        AuthorService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add an author successfully', () => {
    const authorData = {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      language: 'English',
      idAdmin: 'Mock value'
    };
    const authorService = TestBed.inject(AuthorService);
    spyOn(authorService, 'postAuthor').and.returnValue(of({ result: { success: 'Author added successfully' } }));

    component.authorForm.patchValue(authorData); // Change ici
    component.postAuthor();

    expect(authorService.postAuthor).toHaveBeenCalledWith(JSON.stringify(authorData).replace(/,/g, ';'));
    expect(component.submitted).toBeFalsy();
  });

  it('should update an author successfully', () => {
    const authorData = {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      language: 'English',
      idAdmin: 'Mock value' // Ici, on ajoute l'idAdmin
    };
    const authorService = TestBed.inject(AuthorService);
    spyOn(authorService, 'putAuthor').and.returnValue(of({ result: { success: 'Author updated successfully' } }));

    component.selectedAuthor = { ID: '1' }; // Définir l'ID de l'auteur sélectionné ici
    component.authorForm.patchValue(authorData);
    component.updateAuthor();

    expect(authorService.putAuthor).toHaveBeenCalledWith('1', JSON.stringify(authorData).replace(/,/g, ';'));
  });

  it('should retrieve authors successfully', () => {
    const mockAuthors = [
      { id: '1', firstname: 'John', lastname: 'Doe', language: 'English' },
      { id: '2', firstname: 'Jane', lastname: 'Smith', language: 'French' }
    ];
    const authorService = TestBed.inject(AuthorService);
    spyOn(authorService, 'getAllAuthor').and.returnValue(of({ result: mockAuthors }));

    component.ngOnInit();

    expect(component.authors).toEqual(mockAuthors);
  });


});
