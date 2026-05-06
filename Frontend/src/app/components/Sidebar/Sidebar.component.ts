import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule,
    MatButtonModule, MatInputModule, MatFormFieldModule,
    MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule,
    MatTooltipModule, MatDividerModule, MatChipsModule,
    ContactDetailComponent
  ],
  templateUrl: './Sidebar.component.html',
  styleUrls: ['./Sidebar.component.scss']
})
export class ShellComponent implements OnInit {
  contacts = signal<Contact[]>([]);
  selectedContact = signal<Contact | null>(null);
  loading = signal(false);
  searchQuery = signal('');
  activeView = signal<'all' | 'favorites'>('all');

  // Computed Signals
  filteredContacts = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    let result = this.contacts();

    // Filter by view (All / Favorites)
    if (this.activeView() === 'favorites') {
      result = result.filter(c => c.favorite);
    }

    // Apply search query
    if (q) {
      result = result.filter(c =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phoneNumber.includes(q)
      );
    }

    return result;
  });

  allContactsCount = computed(() => this.contacts().length);
  favoritesCount = computed(() => 
    this.contacts().filter(c => c.favorite).length
  );

  constructor(
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.loading.set(true);
    this.contactService.getAll().subscribe({
      next: (data) => {
        this.contacts.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.showSnack('Failed to load contacts', 'error');
        this.loading.set(false);
      }
    });
  }

  showAll() {
    this.activeView.set('all');
  }

  showFavorites() {
    this.activeView.set('favorites');
  }

  selectContact(contact: Contact) {
    this.selectedContact.set(contact);
  }

  openAddDialog() {
    const ref = this.dialog.open(ContactFormComponent, {
      width: '520px',
      data: { contact: null }
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.contactService.create(result).subscribe({
          next: (created) => {
            this.contacts.update(list => [...list, created]
              .sort((a, b) => a.firstName.localeCompare(b.firstName)));
            this.selectedContact.set(created);
            this.showSnack('Contact added successfully!', 'success');
          },
          error: () => this.showSnack('Failed to add contact', 'error')
        });
      }
    });
  }

  openEditDialog(contact: Contact) {
    const ref = this.dialog.open(ContactFormComponent, {
      width: '520px',
      data: { contact }
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.contactService.update(contact.id, result).subscribe({
          next: (updated) => {
            this.contacts.update(list =>
              list.map(c => c.id === updated.id ? updated : c)
                  .sort((a, b) => a.firstName.localeCompare(b.firstName))
            );
            this.selectedContact.set(updated);
            this.showSnack('Contact updated!', 'success');
          },
          error: () => this.showSnack('Failed to update contact', 'error')
        });
      }
    });
  }

  confirmDelete(contact: Contact) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '380px',
      data: { name: `${contact.firstName} ${contact.lastName}` }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.contactService.delete(contact.id).subscribe({
          next: () => {
            this.contacts.update(list => list.filter(c => c.id !== contact.id));
            if (this.selectedContact()?.id === contact.id) {
              this.selectedContact.set(null);
            }
            this.showSnack('Contact deleted.', 'success');
          },
          error: () => this.showSnack('Failed to delete contact', 'error')
        });
      }
    });
  }

  getInitials(contact: Contact): string {
    return `${contact.firstName.charAt(0)}${contact.lastName.charAt(0) || ''}`.toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#4285F4','#EA4335','#34A853','#FBBC05','#9C27B0','#00BCD4','#FF5722','#607D8B'];
    let hash = 0;
    for (const ch of name) hash = ch.charCodeAt(0) + (hash << 5) - hash;
    return colors[Math.abs(hash) % colors.length];
  }

  private showSnack(msg: string, type: 'success' | 'error') {
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
      panelClass: type === 'error' ? ['snack-error'] : ['snack-success']
    });
  }
}