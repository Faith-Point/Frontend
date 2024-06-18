import { ICountry } from "./ICountry";

export interface IState {
	id?: string;
	short_name?: string;
	long_name?: string;
	code?: string;
	country: ICountry;
}