import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
})
export class EmailFieldComponent {

  @Input() emailControl!: FormControl;
  @Input() submitted!: boolean;
  @Input() id!: string;

}
