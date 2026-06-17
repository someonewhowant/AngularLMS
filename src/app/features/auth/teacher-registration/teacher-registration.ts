import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher-registration',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './teacher-registration.html',
  styleUrl: './teacher-registration.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherRegistration {
  applicationForm: FormGroup;
  isSubmitting = false;
  selectedFileName = '';

  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      linkedIn: ['', Validators.pattern('https?://.+')],
      jobTitle: ['', Validators.required],
      experience: ['', Validators.required],
      resume: [null]
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFileName = file.name;
      this.applicationForm.patchValue({ resume: file });
    }
  }

  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      this.isSubmitting = true;
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Application submitted successfully!');
      }, 2000);
    } else {
      this.applicationForm.markAllAsTouched();
    }
  }
}
