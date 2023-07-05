import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from "../../services/auth.service";
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable';

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
      civility: new FormControl(null, Validators.required),
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

  async orderPdf(order: any) {
    const doc = new jsPDF();

    // Fetch logo from assets
    const logoUrl = 'assets/img/LogoV2.jpg';
    const response = await fetch(logoUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
      const base64data = reader.result;
      doc.addImage(base64data as string, 'JPEG', 10, 10, 50, 50);

    // Add Company Details
    doc.setFontSize(20);
    doc.text('Entreprise L2I', 70, 30); // position adjusted for logo
    doc.setFontSize(12);
    doc.text('146-148 Rue de Picpus', 70, 40); // position adjusted for logo
    doc.text('75012 Paris', 70, 50); // position adjusted for logo

    // Add Billing Address
    doc.setFontSize(12);
    doc.text(order.fullname, 130, 70, { align: "left" });
    if (order.addressComplement) {
      doc.text(order.addressComplement, 130, 80, { align: "left" });
    }
    doc.text(order.street , 130, 90, { align: "left" });
    doc.text(`${order.zipCode} ${order.city}`, 130, 100, { align: "left" });
    doc.text(order.country, 130, 110, { align: "left" });

    // Add Invoice Details
    doc.setFontSize(14);
    doc.text(`Facture numéro : ${order.numberFact}`, 10, 120);

    const dateWithoutExclamationMarks = order.date.replace(/!!/g, '');
    const dateParts = dateWithoutExclamationMarks.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    doc.text(`Date : ${formattedDate}`, 10, 130);

    // Add Table
    autoTable(doc,{
      head: [['Article', 'Quantité', 'Prix unitaire', 'Total']],
      body: order.lines.map((line: any) => [
        line.title,
        line.quantityOrder,
        `${line.priceIncludingTaxes.toFixed(2)} €`,
        `${(line.priceIncludingTaxes * line.quantityOrder).toFixed(2)} €`
      ]),
      startY: 140
    });

    const totalTVA = order.totalIncludingTaxes - order.totalExcludingTaxes;
    const finalY = (doc as any).lastAutoTable.finalY;

    // Add Total
    doc.setFontSize(16);
    doc.text('Total HT :', 10, finalY + 20);
    doc.text(`${order.totalExcludingTaxes.toFixed(2)} €`, 50, finalY + 20);

    doc.text('TVA :', 10, finalY + 30);  // Reduced from 40 to 30
    doc.text(`  ${totalTVA.toFixed(2)} €`, 50, finalY + 30);

    doc.text('Total TTC :', 10, finalY + 40);  // Reduced from 60 to 40
    doc.text(`${order.totalIncludingTaxes.toFixed(2)} €`, 50, finalY + 40);

    // Save the PDF
    doc.save(`Facture L2I n°${order.numberFact}.pdf`);
  }
  }

  getFormControl(name: string): FormControl {
    return this.updateUserForm.get(name) as FormControl;
  }

}
