import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, MatIconModule, MatButtonModule, MatDividerModule, MatTooltipModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {
  @Input() contact!: Contact;
  @Output() edit = new EventEmitter<Contact>();
  @Output() delete = new EventEmitter<Contact>();

  getInitials(c: Contact): string {
    return `${c.firstName.charAt(0)}${c.lastName.charAt(0) || ''}`.toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#4285F4','#EA4335','#34A853','#FBBC05','#9C27B0','#00BCD4','#FF5722','#607D8B'];
    let hash = 0;
    for (const ch of name) hash = ch.charCodeAt(0) + (hash << 5) - hash;
    return colors[Math.abs(hash) % colors.length];
  }
}
