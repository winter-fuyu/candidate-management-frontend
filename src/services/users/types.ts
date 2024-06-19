export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  callTimeInterval: string;
  linkedinUrl?: null;
  githubUrl?: string;
  comment: string;
}
export interface UserCreateDto {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  callTimeInterval: string;
  linkedinUrl?: null;
  githubUrl?: string;
  comment: string;
}
