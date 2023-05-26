import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { AuthorComponent } from './author.component';
import { FormBuilder } from '@angular/forms';
import { AuthorService } from '../../../services/author.service';

describe('AuthorComponentIntegration', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
      providers: [FormBuilder, AuthorService]
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
      language: 'English'
    };
    const authorService = TestBed.inject(AuthorService);
    spyOn(authorService, 'postAuthor').and.returnValue(of({ result: { success: 'Author added successfully' } }));

    component.authorForm.setValue(authorData);
    component.postAuthor();

    expect(authorService.postAuthor).toHaveBeenCalledWith(JSON.stringify(authorData).replace(/,/g, ';'));
    expect(component.submitted).toBeFalsy();
  });

  it('should update an author successfully', () => {
  const authorData = {
    id: '1',
    firstname: 'John',
    lastname: 'Doe',
    language: 'English'
  };
  const authorService = TestBed.inject(AuthorService);
  spyOn(authorService, 'putAuthor').and.returnValue(of({ result: { success: 'Author updated successfully' } }));

  component.selectedAuthor = { ID: '1' }; // Assurez-vous que l'auteur sélectionné correspond à celui que vous souhaitez modifier
  component.authorForm.setValue(authorData);
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
