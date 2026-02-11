export type InputEvent = React.ChangeEvent<HTMLInputElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;

export interface CountryInfo {
	name: string;
	capital: string | undefined;
	lat: number | undefined;
	lon: number | undefined;
	flag: string;
	area: number;
	population: number;
	languages: string[];
}

export interface WeatherInfo {
	temperature: number;
	wind: number;
	icon: string;
}
