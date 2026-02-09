import type { CountryInfo } from "../types";
import Country from "./Country";
import CountryData from "./CountryData";

interface PersonsListProps {
	handleShowCountry: (country: string) => void;
	countries: CountryInfo[];
}
const CountriesList = ({ countries, handleShowCountry }: PersonsListProps) => {
	if (countries.length > 10) {
		return <p>To many countries, please specify filter</p>;
	}

	if (countries.length === 0) {
		return <p>No matches found</p>;
	}

	if (countries.length === 1) {
		return <CountryData country={countries[0]} />;
	}
	return (
		<>
			<ul>
				{countries.map((country) => {
					return (
						<li key={country.name}>
							<Country
								handleShowCountry={handleShowCountry}
								country={country.name}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default CountriesList;
