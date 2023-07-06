import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-confirm-password-field',
  templateUrl: './confirm-password-field.component.html',
})
export class ConfirmPasswordFieldComponent {

  @Input() confirmPasswordControl!: FormControl;
  @Input() submitted!: boolean;
  @Input() id!: string;

  displayConfirmPassword() {
    const x = document.getElementById("confirmPassword");
    if (x?.getAttribute("type") === "password") {
      x.setAttribute("type", "text");
    } else {
      x?.setAttribute("type", "password");
    }
  }

}
