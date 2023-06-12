import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-user-administration',
  templateUrl: './user-administration.component.html',
  styleUrls: ['./user-administration.component.css']
})
export class UserAdministrationComponent implements OnInit {

  orderList: any[] = [];
  updateUserForm!: FormGroup;
  updateDeliveryForm!: FormGroup;
  submittedUpdateUserForm = false;
  submittedUpdateDeliveryForm = false;
  user!: any;
  success = false;
  message: string = '';
  showDetails: boolean = false;
  detailItems: any[] = [];

  constructor(
    private formBuilder:FormBuilder,
    private route: ActivatedRoute,
    private us:UserService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const id: string| null  = this.route.snapshot.paramMap.get('id');

    this.us.getUserById(id).subscribe((res:any) => {
      if(res.result.disconnect == true) {
        setTimeout(() => {
          this.authService.logout();
        }, 3000);
      }

      this.user = res.result;
      this.orderList = res.result.orders;

      this.updateUserForm.patchValue({
        civility: this.user.civility,
        firstName: this.user.firstname,
        lastName: this.user.lastname,
        invoiceStreet: this.user.invoiceStreet,
        invoiceAddressComplement: this.user.invoiceAddressComplement,
        invoiceZipCode: this.user.invoiceZipCode,
        invoiceCity: this.user.invoiceCity,
        invoiceCountry: this.user.invoiceCountry,
      });

      this.updateDeliveryForm.patchValue({
        deliveryStreet: this.user.deliveryStreet,
        deliveryAddressComplement: this.user.deliveryAddressComplement,
        deliveryZipCode: this.user.deliveryZipCode,
        deliveryCity: this.user.deliveryCity,
        deliveryCountry: this.user.deliveryCountry,
      });
    });

    this.updateUserForm = this.formBuilder.group({
      civility: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      invoiceStreet: ['', [Validators.required, Validators.minLength(3)]],
      invoiceAddressComplement: [''],
      invoiceZipCode: ['', [Validators.required, Validators.minLength(5)]],
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

  showOrderDetails(order:any ): void {
    this.detailItems=order.lines
    this.showDetails = true;
  }

  onUpdateUserForm() {
    const id = this.route.snapshot.paramMap.get('id');
    this.submittedUpdateUserForm = true;
    if (this.updateUserForm.invalid) {
      return;
    }

    const formValue = this.updateUserForm.value;
    const item = JSON.stringify(formValue).replace(/,/g, ';');

    this.us.updateUser(id, item).subscribe((res:any) => {
      if(res.result.disconnect == true) {
        setTimeout(() => {
          this.authService.logout();
        }, 3000);
        return;
      }
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
    const item = JSON.stringify(formValue).replace(/,/g, ';');

    this.us.updateAddressDelivery(id, item).subscribe((res:any) => {
      if(res.result.disconnect == true) {
        setTimeout(() => {
          this.authService.logout();
        }, 3000);
        return;
      }

      this.success=true;
      this.message='Votre adresse a été mise à jour avec succès.'
      setTimeout(() => {
        this.success=false;
        this.message='';
      }, 2000);
    });
  }

  deleteUser() {
     const id = this.route.snapshot.paramMap.get('id');
    this.us.deleteUser(id).subscribe((res:any) => {
      if(res.result.disconnect == true) {
        setTimeout(() => {
          this.authService.logout();
        }, 3000);
        return;
      }
      if(res.result.disconnect === true) {
        localStorage.setItem('login', 'false');
        localStorage.removeItem('userID');
        this.authService.setIsLogged(false);
        this.router.navigate(['/login']);
        return;
      }

      this.success=true;
      this.message='Votre compte a été supprimé avec succès.'
      setTimeout(() => {
        this.success=false;
        this.message='';
      }, 2000);
      localStorage.setItem('login', 'false');
      localStorage.removeItem('userID');
      this.authService.setIsLogged(false);
      this.router.navigate(['/login']);
    });
  }

}
