import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact, CreateContactDto, UpdateContactDto } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly baseUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {}

  getAll(search?: string): Observable<Contact[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    return this.http.get<Contact[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`);
  }

  create(dto: CreateContactDto): Observable<Contact> {
    return this.http.post<Contact>(this.baseUrl, dto);
  }

  update(id: number, dto: UpdateContactDto): Observable<Contact> {
    return this.http.put<Contact>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
