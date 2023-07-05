import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-lastname-field',
  templateUrl: './lastname-field.component.html',
})
export class LastnameFieldComponent {
  @Input() lastNameControl!: FormControl;
  @Input() submitted!: boolean;
}

