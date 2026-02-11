import { useEffect, useState } from "react";
import type { CountryInfo, WeatherInfo } from "../types";
import countryService from "../services/countries";
interface CountryDataProps {
	country: CountryInfo;
}

const CountryData = ({ country }: CountryDataProps) => {
	const [weather, setWeather] = useState<WeatherInfo>();
	useEffect(() => {
		if (country.lat === undefined || country.lon === undefined) {
			return;
		}
		countryService.getWeatherInfo(country.lat, country.lon).then((response) => {
			setWeather(response);
		});
	}, [country.lat, country.lon]);

	return (
		<div>
			<h1>{country.name}</h1>
			<span>Capital: {country.capital}</span>
			<br />
			<span>Area: {country.area}</span>
			<h3>Languages</h3>
			<ul>
				{country.languages.map((language) => {
					return <li key={language}>{language}</li>;
				})}
			</ul>
			<img src={country.flag} alt={`${country.name} flag`} width="200" />
			{weather && (
				<div>
					<h2>Weather in {country.capital}</h2>
					<span>Temperature: {weather.temperature} °C</span>
					<br />
					<span>Wind: {weather.wind} m/s</span>
					<br />
					<img src={weather.icon} alt="Weather icon" />
				</div>
			)}
		</div>
	);
};

export default CountryData;
