import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all?fields=";

interface CountryDTO {
	name: { common: string };
	flags: { svg: string };
	area: number;
	population: number;
	capital?: string[];
	languages?: Record<string, string>;
}

const getAll = () => {
	return axios
		.get<CountryDTO[]>(`${baseUrl}name,flags,area,population,capital,languages`)
		.then((response) => {
			return response.data.map((info) => {
				return {
					name: info.name.common,
					capital: info.capital?.[0] || "No capital",
					flag: info.flags.svg,
					area: info.area,
					population: info.population,
					languages: info.languages ? Object.values(info.languages) : [],
				};
			});
		});
};

export default { getAll };
