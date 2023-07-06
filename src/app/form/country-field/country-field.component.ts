import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-country-field',
  templateUrl: './country-field.component.html',
})
export class CountryFieldComponent {
  @Input() countryControl!: FormControl;
  @Input() submitted!: boolean;
  @Input() id!: string;

}
