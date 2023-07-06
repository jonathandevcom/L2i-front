import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-city-field',
  templateUrl: './city-field.component.html',
})
export class CityFieldComponent {

  @Input() cityControl!: FormControl;
  @Input() submitted!: boolean;
  @Input() id!: string;
}
