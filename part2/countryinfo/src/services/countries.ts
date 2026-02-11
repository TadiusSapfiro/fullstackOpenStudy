import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all?fields=";

interface CountryDTO {
	name: { common: string };
	flags: { svg: string };
	area: number;
	population: number;
	capital?: string[];
	capitalInfo?: { latlng: number[] };
	languages?: Record<string, string>;
}

interface WeatherDTO {
	main: { temp: number };
	wind: { speed: number };
	weather: { icon: string }[];
}

const getWeatherInfo = (lat: number, lng: number) => {
	const api_key = import.meta.env.VITE_API_KEY;
	console.log(api_key);

	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`;
	return axios.get<WeatherDTO>(url).then((response) => {
		return {
			temperature: response.data.main.temp,
			wind: response.data.wind.speed,
			icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
		};
	});
};

const getAll = () => {
	return axios
		.get<
			CountryDTO[]
		>(`${baseUrl}name,flags,area,population,capital,languages,capitalInfo `)
		.then((response) => {
			return response.data.map((info) => {
				return {
					name: info.name.common,
					capital: info.capital?.[0] || "No capital",
					lat: info.capitalInfo?.latlng[0] || 0,
					lon: info.capitalInfo?.latlng[1] || 0,
					flag: info.flags.svg,
					area: info.area,
					population: info.population,
					languages: info.languages ? Object.values(info.languages) : [],
				};
			});
		});
};

export default { getAll, getWeatherInfo };
