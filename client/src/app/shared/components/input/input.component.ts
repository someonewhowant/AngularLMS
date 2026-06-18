import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  template: `
    <div class="input-container">
      @if (label()) {
        <label [for]="id()" class="input-label">{{ label() }}</label>
      }
      <input
        [id]="id()"
        [type]="type()"
        [placeholder]="placeholder()"
        [formControl]="control()"
        [class.has-error]="error()"
        [attr.aria-invalid]="!!error()"
        [attr.aria-describedby]="error() ? id() + '-error' : null"
        class="input-field"
      />
      @if (error()) {
        <span [id]="id() + '-error'" class="input-error" role="alert">
          {{ error() }}
        </span>
      }
    </div>
  `,
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  id = input.required<string>();
  label = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('');
  control = input.required<FormControl<any>>();
  error = input<string>('');
}
