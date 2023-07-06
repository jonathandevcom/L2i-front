import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-zip-code-field',
  templateUrl: './zip-code-field.component.html'
})
export class ZipCodeFieldComponent {

  @Input() zipCodeControl!: FormControl;
  @Input() submitted!: boolean;
  @Input() id!: string;

}
