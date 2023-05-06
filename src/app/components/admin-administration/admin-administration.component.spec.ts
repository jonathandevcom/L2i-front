import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdministrationComponent } from './admin-administration.component';

describe('AdminAdministrationComponent', () => {
  let component: AdminAdministrationComponent;
  let fixture: ComponentFixture<AdminAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdministrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
