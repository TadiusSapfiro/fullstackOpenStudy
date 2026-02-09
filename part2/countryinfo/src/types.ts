export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;

export interface CountryInfo {
	name: string;
	capital: string | undefined;
	flag: string;
	area: number;
	population: number;
	languages: string[];
}
