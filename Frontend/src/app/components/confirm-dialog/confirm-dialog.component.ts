import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-wrap">
      <mat-icon class="warn-icon">warning</mat-icon>
      <h2 mat-dialog-title>Delete Contact</h2>
      <mat-dialog-content>
        <p>Are you sure you want to delete <strong>{{ data.name }}</strong>? This action cannot be undone.</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="ref.close(false)">Cancel</button>
        <button mat-flat-button color="warn" (click)="ref.close(true)">Delete</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-wrap { padding: 8px; text-align: center; }
    .warn-icon { font-size: 48px; width: 48px; height: 48px; color: #d32f2f; margin-bottom: 8px; }
    h2 { margin: 0 0 4px; font-size: 20px; }
    p { color: #5f6368; margin: 0; }
    mat-dialog-actions { margin-top: 16px; }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public ref: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}
}
