import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html'
})
export class PasswordFieldComponent {

  @Input() passwordControl!: FormControl;
  @Input() submitted!: boolean;

  constructor() { }

  displayPassword() {
    const x = document.getElementById("password");
    if (x?.getAttribute("type") === "password") {
      x.setAttribute("type", "text");
    } else {
      x?.setAttribute("type", "password");
    }
  }
}
