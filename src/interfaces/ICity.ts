import { IState } from "./IState";

export interface ICity {
	id?: string;
	short_name?: string;
	long_name?: string;
	code?: string;
	state?: IState;
}