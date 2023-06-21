import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() message!: string;
  @Input() color!: string;

  constructor() {
    this.message = '';
  }

}
