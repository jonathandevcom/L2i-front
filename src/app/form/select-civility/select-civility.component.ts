import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-civility',
  templateUrl: './select-civility.component.html'
})
export class SelectCivilityComponent {
  @Input() civilityControl!: FormControl;
  @Input() submitted!: boolean;
  @Input() id!: string;

  constructor() { }
}
