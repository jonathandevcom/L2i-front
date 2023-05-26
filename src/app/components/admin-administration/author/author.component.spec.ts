import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorComponent } from './author.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

describe('AuthorComponent', () => {
  let component: AuthorComponent;
  let fixture: ComponentFixture<AuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [ FormBuilder ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 3 controls', () => {
    expect(component.authorForm.contains('firstname')).toBeTruthy();
    expect(component.authorForm.contains('lastname')).toBeTruthy();
    expect(component.authorForm.contains('language')).toBeTruthy();
  });

  it('should make the firstname control required', () => {
    let control = component.authorForm.get('firstname');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the lastname control required', () => {
    let control = component.authorForm.get('lastname');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the language control required', () => {
    let control = component.authorForm.get('language');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should call the onSubmit method', () => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  });

  it('should create the authorForm with required controls', () => {
    expect(component.authorForm.contains('id')).toBeTruthy();
    expect(component.authorForm.contains('firstname')).toBeTruthy();
    expect(component.authorForm.contains('lastname')).toBeTruthy();
    expect(component.authorForm.contains('language')).toBeTruthy();

    const firstnameControl = component.authorForm.get('firstname');
    expect(firstnameControl?.errors?.['required']).toBeTruthy();

    const lastnameControl = component.authorForm.get('lastname');
    expect(lastnameControl?.errors?.['required']).toBeTruthy();

    const languageControl = component.authorForm.get('language');
    expect(languageControl?.errors?.['required']).toBeTruthy();
  });

  it('should submit the form with valid data', () => {
    const authorData = {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      language: 'English'
    };

    component.authorForm.setValue(authorData);
    component.onSubmit();

    expect(component.submitted).toBeTruthy();
    expect(component.authorForm.valid).toBeTruthy();
  });

  it('should not submit the form with invalid data', () => {
    const invalidAuthorData = {
      id: '1',
      firstname: '',
      lastname: '',
      language: ''
    };

    component.authorForm.setValue(invalidAuthorData);
    component.onSubmit();

    expect(component.submitted).toBeTruthy();
    expect(component.authorForm.valid).toBeFalsy();
  });

  it('should select an existing author', () => {
    const author = {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      language: 'English'
    };

    component.selectAuthor(author);

    expect(component.selectedAuthor).toEqual(author);
    expect(component.selectedAuthorCheck).toBeTruthy();
    expect(component.submitted).toBeFalsy();

    const formValues = component.authorForm.value;
    expect(formValues.id).toBe(author.id);
    expect(formValues.firstname).toBe(author.firstname);
    expect(formValues.lastname).toBe(author.lastname);
    expect(formValues.language).toBe(author.language);
  });


});
