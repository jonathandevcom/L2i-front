import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-firstname-field',
  templateUrl: './firstname-field.component.html'
})
export class FirstnameFieldComponent {
  @Input() firstNameControl!: FormControl;
  @Input() submitted!: boolean;
  @Input() id!: string;

  constructor() { }
}

