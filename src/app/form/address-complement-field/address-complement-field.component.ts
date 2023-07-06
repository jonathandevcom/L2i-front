import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-address-complement-field',
  templateUrl: './address-complement-field.component.html',
})
export class AddressComplementFieldComponent {

  @Input() addressComplementControl!: FormControl;
  @Input() id!: string;

}
