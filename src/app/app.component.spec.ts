import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(async () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      providers: [ FormBuilder ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  /*it(`should have as title 'L2I-FRONT'`, () => {
    expect(app.title).toEqual('L2I-FRONT');
  });*/

});
function app(app: any) {
    throw new Error('Function not implemented.');
}

