export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  address: string;
  favorite: boolean;
  createdAt: string;
}

export interface CreateContactDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  address: string;
  favorite: boolean;
}

export type UpdateContactDto = CreateContactDto;
