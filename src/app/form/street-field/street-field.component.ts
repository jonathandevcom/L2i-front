import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-street-field',
  templateUrl: './street-field.component.html',
})
export class StreetFieldComponent {

  @Input() streetControl!: FormControl;
  @Input() submitted!: boolean;
  @Input() id!: string; 

  constructor() { }
}
