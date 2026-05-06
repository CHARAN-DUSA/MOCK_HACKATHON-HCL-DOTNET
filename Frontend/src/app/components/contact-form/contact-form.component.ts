import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Contact } from '../../models/contact.model';

export interface ContactFormData {
  contact: Contact | null;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatButtonModule, MatInputModule,
    MatFormFieldModule, MatIconModule, MatCheckboxModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  form!: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactFormData
  ) {
    this.isEdit = !!data.contact;
  }

  ngOnInit() {
    const c = this.data.contact;
    this.form = this.fb.group({
      firstName: [c?.firstName || '', [Validators.required, Validators.maxLength(50)]],
      lastName: [c?.lastName || '', Validators.maxLength(50)],
      email: [c?.email || '', [Validators.email, Validators.maxLength(100)]],
      phoneNumber: [c?.phoneNumber || '', Validators.maxLength(20)],
      company: [c?.company || '', Validators.maxLength(100)],
      address: [c?.address || '', Validators.maxLength(250)],
      favorite: [c?.favorite || false]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
