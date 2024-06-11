export type IUserSearch = [IUser[], number];

export interface IUser {
  id: string;
  address: string;
  email: string;
  phone: string;

  userName: string;
  company: string;
  skills: string;
  price: number;

  country: string;
  city: string;  

  bio: string;
  facebook: string;
  linkedIn: string;
  twitter: string;
  instagram: string;
  youtube: string;
  telegram: string;
  whatsapp: string;
  github: string;
}
