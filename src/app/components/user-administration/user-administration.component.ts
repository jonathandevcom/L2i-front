import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.css']
})
export class UserAdministrationComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private us:UserService
  ) { }

  updateUserForm!: FormGroup;
  updateDeliveryForm!: FormGroup;
  submittedUpdateUserForm = false;
  submittedUpdateDeliveryForm = false;
  user!: any;
  success = false;
  message: string = '';

  ngOnInit(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');

    this.us.getUserById(id).subscribe((res:any) => {
      this.user = res.result;
    });

    this.updateUserForm = this.formBuilder.group({
      civility: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      invoiceStreet: ['', [Validators.required, Validators.minLength(3)]],
      invoiceAddressComplement: [''],
      invoiceZipCode: ['', [Validators.required, Validators.minLength(3)]],
      invoiceCity: ['', [Validators.required, Validators.minLength(3)]],
      invoiceCountry: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.updateDeliveryForm = this.formBuilder.group({
      deliveryStreet: ['', [Validators.required, Validators.minLength(3)]],
      deliveryAddressComplement: [''],
      deliveryZipCode: ['', [Validators.required, Validators.minLength(3)]],
      deliveryCity: ['', [Validators.required, Validators.minLength(3)]],
      deliveryCountry: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onUpdateUserForm() {
    const id = this.route.snapshot.paramMap.get('id');
    this.submittedUpdateUserForm = true;
    if (this.updateUserForm.invalid) {
      return;
    }

    const formValue = this.updateUserForm.value;
    formValue.id = id;
    const item = JSON.stringify(formValue).replace(/,/g, ';');

    this.us.updateUser(item).subscribe((res:any) => {
      this.success=true;
      this.message='Votre profil a été mis à jour avec succès.'
      setTimeout(() => {
        this.success=false;
        this.message='';
      }, 2000);
    });
  }

  onUpdateDeliveryUserForm() {
    const id = this.route.snapshot.paramMap.get('id');
    this.submittedUpdateDeliveryForm = true;
    if (this.updateDeliveryForm.invalid) {
      return;
    }

    const formValue = this.updateDeliveryForm.value;
    formValue.id = id;
    const item = JSON.stringify(formValue).replace(/,/g, ';');

    this.us.updateAddressDelivery(item).subscribe((res:any) => {
      this.success=true;
      this.message='Votre adresse a été mise à jour avec succès.'
      setTimeout(() => {
        this.success=false;
        this.message='';
      }, 2000);
    });
  }

}
