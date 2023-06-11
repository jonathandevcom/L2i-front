import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeComponent } from './type.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

describe('TypeComponent', () => {
  let component: TypeComponent;
  let fixture: ComponentFixture<TypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeComponent ],
      imports: [ ReactiveFormsModule, HttpClientModule ],
      providers: [ FormBuilder ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
