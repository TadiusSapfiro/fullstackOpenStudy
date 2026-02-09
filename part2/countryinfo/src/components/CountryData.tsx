import type { CountryInfo } from "../types";

interface CountryDataProps {
	country: CountryInfo;
}
const CountryData = ({ country }: CountryDataProps) => {
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
		</div>
	);
};

export default CountryData;
