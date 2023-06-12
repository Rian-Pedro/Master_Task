import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent {

  @Input() name: String = '';
  @Input() title: String = '';
  @Input() type: String = '';
  @Input() msgError: String = '';

}
