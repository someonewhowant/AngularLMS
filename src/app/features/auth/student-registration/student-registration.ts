import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './student-registration.html',
  styleUrl: './student-registration.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentRegistration {
  registrationForm: FormGroup;
  isSubmitting = false;
  showPassword = false;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.requiredTrue]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Registration payload sent. Welcome to the Academy, Engineer.');
      }, 2000);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
