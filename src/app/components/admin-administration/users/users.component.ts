import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: any[];
  selectedUser: any = {};
  selectedUserCheck: boolean = false;
  userForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder:FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUsers();

    this.userForm = this.formBuilder.group({
      civility: ['', Validators.required],
      userFirstname: ['', Validators.required],
      userLastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],
      password: ['', this.passwordValidator()],
      isAccess: [true],
      deliveryStreet: [''],
      deliveryAddressComplement: [''],
      deliveryZipCode: [''],
      deliveryCity: [''],
      deliveryCountry: [''],
      invoiceStreet: ['', Validators.required],
      invoiceAddressComplement: [''],
      invoiceZipCode: ['', Validators.required],
      invoiceCity: ['', Validators.required],
      invoiceCountry: ['', Validators.required],
    });
  }

  onSubmit() {
    let message: string = '';
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
  }

  getUsers(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    this.userService.getAllUser(id).subscribe({
      next: (response: any) => {
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
        this.users = response.result;
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
        this.getUsers();
        setTimeout(function() {
          alertElement.style.display = 'none';
        }, 3000);
      }
    }
  }

  postUser() {
    if (this.userForm.invalid) {
        return;
    }
    const formValues = this.userForm.value;
    const userData = {
      civility: formValues.civility,
      userFirstname: formValues.userFirstname,
      userLastname: formValues.userLastname,
      email: formValues.email,
      type: formValues.type,
      password: formValues.password,
      isAccess:formValues.isAccess,
      invoiceStreet: formValues.invoiceStreet,
      invoiceAddressComplement: formValues.invoiceAddressComplement,
      invoiceZipCode: formValues.invoiceZipCode,
      invoiceCity: formValues.invoiceCity,
      invoiceCountry: formValues.invoiceCountry,
      deliveryStreet: formValues.deliveryStreet,
      deliveryAddressComplement: formValues.deliveryAddressComplement,
      deliveryZipCode: formValues.deliveryZipCode,
      deliveryCity: formValues.deliveryCity,
      deliveryCountry: formValues.deliveryCountry
    };

    if (this.userForm.value.password === "") {
      let response: { result: { error: string } } = {
        result: {
          error: "Le mot de passe est obligatoire pour la création d'un compte."
        }
      };
      this.handleResponse(response);
      return;
    }
    if ((userData.invoiceStreet || userData.invoiceZipCode || userData.invoiceCity || userData.invoiceCountry) && (!userData.invoiceStreet || !userData.invoiceZipCode || !userData.invoiceCity || !userData.invoiceCountry)) {
      let response: { result: { error: string } } = {
        result: {
          error: "Tous les champs, sauf le complément d'adresse, sont obligatoires."
        }
      };
      this.handleResponse(response);
      return;

    }

    this.userService.postNewUserByAdmin(JSON.stringify(userData).replace(/,/g, ';')).subscribe({
      next: (response: any) => {
        this.handleResponse(response);
        if(response.result.success){
          this.userForm.patchValue({
            civility: "",
            userFirstname: "",
            userLastname: "",
            email: "",
            type: "",
            password: "",
            isAccess: "",
            invoiceStreet: "",
            invoiceAddressComplement: "",
            invoiceZipCode: "",
            invoiceCity: "",
            invoiceCountry: "",
            deliveryStreet: "",
            deliveryAddressComplement: "",
            deliveryZipCode: "",
            deliveryCity: "",
            deliveryCountry: ""
          });
          this.submitted = false;
        }
      },
      error: (error) => console.log(error),
    });

  }

  updateUser() {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    if (this.userForm.invalid) {
      return;
    }
    const formValues = this.userForm.value;
    const userData = {
      civility: formValues.civility,
      userFirstname: formValues.userFirstname,
      userLastname: formValues.userLastname,
      email: formValues.email,
      type: formValues.type,
      password: formValues.password,
      isAccess:formValues.isAccess,
      invoiceStreet: formValues.invoiceStreet,
      invoiceAddressComplement: formValues.invoiceAddressComplement,
      invoiceZipCode: formValues.invoiceZipCode,
      invoiceCity: formValues.invoiceCity,
      invoiceCountry: formValues.invoiceCountry,
      deliveryStreet: formValues.deliveryStreet,
      deliveryAddressComplement: formValues.deliveryAddressComplement,
      deliveryZipCode: formValues.deliveryZipCode,
      deliveryCity: formValues.deliveryCity,
      deliveryCountry: formValues.deliveryCountry,
      idAdmin: id,
    };
    this.userService.putUserByAdmin(this.selectedUser.ID, JSON.stringify(userData).replace(/,/g, ';')).subscribe({
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

  deleteUser(): void {
    const id: string| null  = this.route.snapshot.paramMap.get('id');
    this.userService.deleteUserByAdmin(this.selectedUser.ID, id).subscribe({
      next:(response: any) => {
        this.handleResponse(response);
        if(response.result.disconnect == true) {
          setTimeout(() => {
            this.authService.logout();
          }, 3000);
          return;
        }
        this.selectedUser = {};
        this.selectedUserCheck = false;
        this.submitted = false;
        this.userForm.patchValue({
          civility: "",
          userFirstname: "",
          userLastname: "",
          email: "",
          type: "",
          password: "",
          isAccess: "",
          invoiceStreet: "",
          invoiceAddressComplement: "",
          invoiceZipCode: "",
          invoiceCity: "",
          invoiceCountry: "",
          deliveryStreet: "",
          deliveryAddressComplement: "",
          deliveryZipCode: "",
          deliveryCity: "",
          deliveryCountry: ""
        });
      },
      error: (error) => console.log(error),
    });
  }

  selectUser(user: any): void {
    this.selectedUser = user;
    this.selectedUserCheck = true;
    this.submitted = false;

    this.userForm.patchValue({
      idUser: user.id,
      civility: user.civility,
      userFirstname: user.firstname,
      userLastname: user.lastname,
      email: user.email,
      type: user.type,
      password: user.password,
      isAccess:user.isAccess,
      invoiceStreet: user.invoiceStreet,
      invoiceAddressComplement: user.invoiceAddressComplement,
      invoiceZipCode: user.invoiceZipCode,
      invoiceCity: user.invoiceCity,
      invoiceCountry: user.invoiceCountry,
      deliveryStreet: user.deliveryStreet,
      deliveryAddressComplement: user.deliveryAddressComplement,
      deliveryZipCode: user.deliveryZipCode,
      deliveryCity: user.deliveryCity,
      deliveryCountry: user.deliveryCountry
    });
  }

  addUser(): void {
    this.selectedUser = {};
    this.selectedUserCheck = false;
    this.submitted = false;
    // Mettre à jour les valeurs du formulaire
    this.userForm.patchValue({
      idUser: "",
      civility: "",
      userFirstname: "",
      userLastname: "",
      email: "",
      type: "",
      password: "",
      isAccess: "",
      invoiceStreet: "",
      invoiceAddressComplement: "",
      invoiceZipCode: "",
      invoiceCity: "",
      invoiceCountry: "",
      deliveryStreet: "",
      deliveryAddressComplement: "",
      deliveryZipCode: "",
      deliveryCity: "",
      deliveryCountry: ""
    });
  }

  passwordValidator(): ValidatorFn {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\-\+\_\!\?]{8,}$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      if(password === undefined){
        return null;
      }
      if (!passwordRegex.test(password)) {
        return { passwordInvalid: true };
      }
      return null;
    };
  }

  diplayPassword() {
    const x = document.getElementById("password");
    if (x?.getAttribute("type") === "password") {
      x.setAttribute("type", "text");
    } else {
      x?.setAttribute("type", "password");
    }
  }

}
