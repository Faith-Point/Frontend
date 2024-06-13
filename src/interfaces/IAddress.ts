import { ICity } from './ICity';

export interface IAddress {
  id: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: ICity;
}
